import {useMemo, useState} from 'react'
import AppLogo from '../other/AppLogo.tsx'
import ChatAvatar from './ChatAvatar.tsx'
import ChatIcon from './ChatIcon.tsx'
import type {Conversation} from '../../types/chat.types.ts'
import AddUserDialog from './AddUserDialog.tsx'
import {type UserSearchResult, UserService} from '../../lib/api/UserService.ts'

type ChatSidebarProps = {
    conversations: Conversation[]
    selectedId: string
    onSelect: (id: string) => void
    mobileOpen: boolean
}

function ChatSidebar({conversations, selectedId, onSelect, mobileOpen}: ChatSidebarProps) {
    const [query, setQuery] = useState('')
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)
    const [isSearchingUser, setIsSearchingUser] = useState(false)
    const [searchedUser, setSearchedUser] = useState<UserSearchResult | null>(null)
    const [userSearchError, setUserSearchError] = useState('')
    const filteredConversations = useMemo(
        function filterConversations() {
            const normalizedQuery = query.trim().toLowerCase()
            return conversations.filter(function matchesConversation(conversation) {
                return conversation.name.toLowerCase().includes(normalizedQuery)
            })
        },
        [conversations, query],
    )

    function renderConversation(conversation: Conversation) {
        return (
            <button
                type="button"
                key={conversation.id}
                className={`flex min-h-18 w-full items-center gap-3 rounded-(--radius-control) border-0 px-3 py-2.5 text-left transition-colors hover:bg-(--color-surface-subtle) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) ${selectedId === conversation.id ? 'bg-(--color-surface-hover)' : 'bg-transparent'}`}
                onClick={function selectConversation() {
                    onSelect(conversation.id)
                }}
                aria-current={selectedId === conversation.id ? 'true' : undefined}
            >
                <ChatAvatar initials={conversation.initials} color={conversation.color} online={conversation.online}/>
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex min-w-0 items-center justify-between gap-2">
            <span className="truncate text-[13px] font-semibold text-(--color-text)">{conversation.name}</span>
            <span className="shrink-0 text-[10px] text-(--color-text-muted)">{conversation.time}</span>
          </span>
          <span className="flex min-w-0 items-center justify-between gap-2">
            <span className="truncate text-[11px] text-(--color-text-secondary)">{conversation.preview}</span>
              {conversation.unread && <span
                  className="inline-grid h-[18px] min-w-[18px] shrink-0 place-items-center rounded-full bg-(--color-brand) px-1 text-[10px] font-bold text-(--color-text-on-brand)">{conversation.unread}</span>}
          </span>
        </span>
            </button>
        )
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

    function openAddUser() {
        setSearchedUser(null)
        setUserSearchError('')
        setIsAddUserOpen(true)
    }

    return (
        <aside
            className={`absolute inset-0 z-2 flex min-w-0 flex-col border-r border-(--color-border) bg-(--color-surface) transition-transform duration-200 md:static md:z-auto md:w-[360px] md:shrink-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            aria-label="Conversations">
            <header className="flex h-[68px] shrink-0 items-center justify-between bg-(--color-surface-subtle) px-5">
                <AppLogo to="/chats" imageClassName="size-8"/>
                <div className="flex items-center gap-2">
                    <button type="button"
                            className="grid size-[38px] place-items-center rounded-full bg-transparent text-(--color-text-muted) hover:bg-(--color-surface-hover) hover:text-(--color-text) focus-visible:outline-2 focus-visible:outline-(--color-focus) md:hidden"
                            aria-label="New chat" onClick={openAddUser}><ChatIcon name="add"/></button>
                    <button type="button"
                            className="grid size-[34px] place-items-center rounded-full bg-(--color-brand-soft) text-[13px] font-bold text-(--color-text) focus-visible:outline-2 focus-visible:outline-(--color-focus)"
                            aria-label="Account menu">Z
                    </button>
                </div>
            </header>
            <div className="flex items-center justify-between px-5 pt-6 pb-4">
                <div>
                    <h1 className="text-[21px] font-semibold tracking-tight text-(--color-text)">Chats</h1>
                    <p className="mt-1 text-xs text-(--color-text-muted)">Your conversations in one place</p>
                </div>
                <button type="button"
                        className="grid size-[38px] place-items-center rounded-full bg-(--color-brand) text-(--color-text-on-brand) hover:bg-(--color-brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
                        aria-label="Start a new chat" onClick={openAddUser}><ChatIcon name="add"/></button>
            </div>
            <label
                className="mx-4 mb-[18px] flex h-10 items-center gap-2.5 rounded-(--radius-control) bg-(--color-surface-subtle) px-3 text-(--color-text-muted) focus-within:border focus-within:border-(--color-border-strong)">
                <ChatIcon name="search" className="size-[18px] shrink-0"/>
                <span className="sr-only">Search conversations</span>
                <input
                    className="w-full min-w-0 border-0 bg-transparent text-[13px] text-(--color-text) outline-none placeholder:text-(--color-text-muted)"
                    value={query} onChange={function updateQuery(event) {
                    setQuery(event.currentTarget.value)
                }} placeholder="Search or start a new chat"/>
                {query && <button type="button" className="border-0 bg-transparent text-(--color-text-muted)"
                                  aria-label="Clear search" onClick={function clearQuery() {
                    setQuery('')
                }}><ChatIcon name="close" className="size-4"/></button>}
            </label>
            <div
                className="px-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-(--color-text-muted)">Recent
                conversations
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-2">
                {filteredConversations.length > 0
                    ? filteredConversations.map(renderConversation)
                    : <p className="p-3 text-[13px] text-(--color-text-muted)">No conversations found</p>}
            </div>
            <footer
                className="flex min-h-12 items-center gap-2 border-t border-(--color-border) px-5 text-[11px] text-(--color-text-muted)">
                <span className="size-[7px] rounded-full bg-(--color-info)"/>
                <span>Sample conversations</span>
            </footer>
            <AddUserDialog open={isAddUserOpen} isSearching={isSearchingUser} user={searchedUser}
                           errorMessage={userSearchError} onClose={function closeAddUser() {
                setIsAddUserOpen(false)
            }} onSearch={searchUser}/>
        </aside>
    )
}

export default ChatSidebar
