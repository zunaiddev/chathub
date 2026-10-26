import {useState} from 'react'
import ChatIcon from './ChatIcon.tsx'
import AddUserDialog from './AddUserDialog.tsx'
import {type UserSearchResult, UserService} from '../../service/UserService.ts'
import ConversationSearch from "./ConversationSearch.tsx";
import ConversationFooter from "./ConversationFooter.tsx";
import ConversationsPanel from "../convresation/ConversationsPanel.tsx";

type ChatSidebarProps = {
    isLoading: boolean,
    conversations: unknown[]
    errorMessage: string | null
    onRetry: () => void
    onConversationCreated?: (conversation: unknown) => void
    mobileOpen: boolean
}

function ChatSidebar({isLoading, conversations, errorMessage, onRetry, onConversationCreated, mobileOpen}: ChatSidebarProps) {
    const [query, setQuery] = useState('')
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)
    const [isSearchingUser, setIsSearchingUser] = useState(false)
    const [isCreatingConversation, setIsCreatingConversation] = useState(false)
    const [searchedUser, setSearchedUser] = useState<UserSearchResult | null>(null)
    const [userSearchError, setUserSearchError] = useState('')

    function notifyConversationCreated(conversation: unknown) {
        if (typeof onConversationCreated === 'function') {
            onConversationCreated(conversation)
        }
    }

    async function searchUser(email: string) {
        setIsSearchingUser(true)
        setUserSearchError('')
        setSearchedUser(null)
        const response = await UserService.searchByEmail(email)
        setIsSearchingUser(false)
        if (response.success && response.payload) {
            setSearchedUser(response.payload)
            return
        }
        if (response.status === 401 || response.status === 403) {
            setUserSearchError(response.error?.message ?? 'Please log in to search for people.')
            return
        }
        setUserSearchError(response.error?.message ?? 'Unable to search for this person.')
    }

    async function createConversationWithUser(user: UserSearchResult) {
        setIsCreatingConversation(true)
        setUserSearchError('')
        const response = await UserService.createConversation(user.id)
        setIsCreatingConversation(false)
        if (response.success) {
            notifyConversationCreated(response.payload ?? user)
            setIsAddUserOpen(false)
            setSearchedUser(null)
            return
        }
        setUserSearchError(response.error?.message ?? 'Unable to start this conversation.')
    }

    function openAddUser() {
        setSearchedUser(null)
        setUserSearchError('')
        setIsAddUserOpen(true)
    }

    return (
        <aside
            className={`absolute inset-0 z-2 flex min-w-0 flex-col border-r border-(--color-border) bg-(--color-surface) transition-transform duration-200 md:static md:z-auto md:w-[360px] md:shrink-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            aria-label="Conversations">
            <div className="flex items-center justify-between px-5 pt-6 pb-4">
                <div>
                    <h1 className="text-[21px] font-semibold tracking-tight text-(--color-text)">Chats</h1>
                    <p className="mt-1 text-xs text-(--color-text-muted)">Your conversations in one place</p>
                </div>
                <button type="button"
                        className="grid size-9.5 place-items-center rounded-full bg-(--color-brand) text-(--color-text-on-brand) hover:bg-(--color-brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
                        aria-label="Start a new chat" onClick={openAddUser}><ChatIcon name="add"/></button>
            </div>
            <ConversationSearch query={query} setQuery={setQuery}/>
            <div
                className="px-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-(--color-text-muted)">Recent
                conversations
            </div>

            <ConversationsPanel isLoading={isLoading} conversations={conversations}
                                errorMessage={errorMessage} onRetry={onRetry}/>

            <ConversationFooter/>
            <AddUserDialog open={isAddUserOpen} isSearching={isSearchingUser} isCreating={isCreatingConversation}
                           user={searchedUser}
                           errorMessage={userSearchError} onClose={function closeAddUser() {
                setIsAddUserOpen(false)
            }} onSearch={searchUser} onCreateConversation={createConversationWithUser}/>
        </aside>
    )
}

export default ChatSidebar
