import {useEffect, useState, type JSX} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {type CurrentUser, UserService} from '../../service/UserService.ts'
import {AuthService} from '../../service/AuthService.ts'
import {JwtService} from '../../service/jwt.service.ts'
import ChatAvatar from './ChatAvatar.tsx'
import ChatIcon from './ChatIcon.tsx'

function ConversationFooter(): JSX.Element {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(function fetchCurrentUser() {
        let isActive = true

        async function loadCurrentUser() {
            const response = await UserService.getCurrentUser()
            if (!isActive) {
                return
            }
            if (response.success && response.payload) {
                setCurrentUser(response.payload)
            }
            setIsLoading(false)
        }

        void loadCurrentUser()

        return function cancelCurrentUserRequest() {
            isActive = false
        }
    }, [])

    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const name = currentUser?.name ?? (isLoading ? 'Loading profile…' : 'Your profile')
    const initials = getInitials(currentUser?.name)

    async function logout() {
        if (isLoggingOut) {
            return
        }
        setIsLoggingOut(true)
        await AuthService.logout()
        JwtService.clearToken()
        navigate('/auth/login', {replace: true})
    }

    return (
        <footer className="shrink-0 border-t border-(--color-border) bg-(--color-surface) px-3 py-3">
            <div className="flex items-center gap-1">
                <Link to="/profile"
                      className="flex min-w-0 flex-1 items-center gap-3 rounded-(--radius-control) px-2 py-2 hover:bg-(--color-surface-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)">
                    <ChatAvatar initials={initials} color="bg-(--color-brand-soft)"/>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-(--color-text)">{name}</span>
                        <span className="block truncate text-xs text-(--color-text-muted)">View profile</span>
                    </span>
                </Link>
                <button type="button"
                        className="grid size-9.5 shrink-0 place-items-center rounded-full text-(--color-text-muted) hover:bg-(--color-surface-hover) hover:text-(--color-text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) disabled:cursor-wait disabled:opacity-70"
                        aria-label="Log out"
                        disabled={isLoggingOut}
                        onClick={logout}>
                    <ChatIcon name="logout"/>
                </button>
            </div>
        </footer>
    )
}

function getInitials(name: string | undefined): string {
    if (!name) {
        return '?'
    }
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) {
        return '?'
    }
    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase()
    }
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export default ConversationFooter
