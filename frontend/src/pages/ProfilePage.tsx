import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {type CurrentUser, UserService} from '../service/UserService.ts'
import Button from '../components/fields/Button.tsx'

function ProfilePage() {
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState<CurrentUser | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [retryCount, setRetryCount] = useState(0)

    useEffect(function fetchCurrentUser() {
        let isActive = true

        async function loadCurrentUser() {
            setIsLoading(true)
            const response = await UserService.getCurrentUser()
            if (!isActive) {
                return
            }

            if (response.success && response.payload) {
                setProfile(response.payload)
                setErrorMessage(null)
                setIsLoading(false)
                return
            }

            setProfile(null)
            setErrorMessage(response.error?.message ?? 'Unable to load your profile.')
            setIsLoading(false)
        }

        void loadCurrentUser()

        return function cancelProfileRequest() {
            isActive = false
        }
    }, [retryCount])

    function retryProfile() {
        setErrorMessage(null)
        setRetryCount(retryCount + 1)
    }

    return (
        <main className="min-h-screen bg-(--color-app-bg) px-4 py-8">
            <section
                className="mx-auto w-full max-w-lg rounded-(--radius-panel) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-panel) sm:p-8">
                <p className="text-sm font-medium text-(--color-text-muted)">
                    <Link to="/"
                          className="text-(--color-brand) hover:text-(--color-brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)">
                        Back to chats
                    </Link>
                </p>
                <h1 className="mt-4 text-2xl font-semibold tracking-tight text-(--color-text)">Profile</h1>
                <p className="mt-2 text-sm text-(--color-text-secondary)">Your ChatHub account details.</p>

                {isLoading && (
                    <p className="mt-8 text-sm text-(--color-text-muted)" role="status">Loading profile…</p>
                )}

                {!isLoading && errorMessage && (
                    <div className="mt-8 space-y-3" role="alert">
                        <p className="text-sm text-(--color-text-secondary)">{errorMessage}</p>
                        <Button onClick={retryProfile}>Retry</Button>
                    </div>
                )}

                {!isLoading && profile && (
                    <dl className="mt-8 space-y-4">
                        <ProfileField label="Name" value={profile.name}/>
                        <ProfileField label="Email" value={profile.email}/>
                        <ProfileField label="Role" value={profile.role}/>
                        <ProfileField label="Status" value={formatAccountStatus(profile)}/>
                        <ProfileField label="Member since" value={formatTimestamp(profile.createdAt)}/>
                        <ProfileField label="Last updated" value={formatTimestamp(profile.updatedAt)}/>
                    </dl>
                )}
            </section>
        </main>
    )
}

type ProfileFieldProps = {
    label: string
    value: string
}

function ProfileField({label, value}: ProfileFieldProps) {
    return (
        <div className="border-b border-(--color-border) pb-3 last:border-b-0 last:pb-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">{label}</dt>
            <dd className="mt-1 text-sm text-(--color-text)">{value}</dd>
        </div>
    )
}

function formatAccountStatus(profile: CurrentUser): string {
    if (profile.locked) {
        return 'Locked'
    }
    if (profile.enabled) {
        return 'Active'
    }
    return 'Disabled'
}

function formatTimestamp(value: string): string {
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
        return value
    }
    return parsed.toLocaleString()
}

export default ProfilePage
