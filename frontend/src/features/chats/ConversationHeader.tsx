import ChatAvatar from './ChatAvatar'
import ChatIcon from './ChatIcon'
import type {Conversation} from './types'

type ConversationHeaderProps = {
    conversation: Conversation
    onBack: () => void
}

function ConversationHeader({conversation, onBack}: ConversationHeaderProps) {
    return (
        <header
            className="z-1 flex h-17 shrink-0 items-center gap-3 border-b border-(--color-border) bg-(--color-surface) px-3 md:px-5">
            <button type="button"
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-transparent text-[32px] leading-none text-(--color-text-muted) hover:bg-(--color-surface-hover) md:hidden"
                    aria-label="Back to conversations" onClick={onBack}><ChatIcon name="back" className="size-6" />
            </button>
            <ChatAvatar initials={conversation.initials} color={conversation.color} online={conversation.online}/>
            <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-(--color-text)">{conversation.name}</h2>
                <p className="mt-1 text-[11px] text-(--color-text-muted)">{conversation.online ? 'online' : 'last active recently'}</p>
            </div>
            <div className="flex items-center gap-2">
                <button type="button"
                        className="grid size-9.5 place-items-center rounded-full bg-transparent text-xl text-(--color-text-muted) hover:bg-(--color-surface-hover) hover:text-(--color-text)"
                        aria-label="Search in conversation"><ChatIcon name="search" /></button>
                <button type="button"
                        className="hidden size-9.5 place-items-center rounded-full bg-transparent text-xl text-(--color-text-muted) hover:bg-(--color-surface-hover) hover:text-(--color-text) md:grid"
                        aria-label="More options"><ChatIcon name="more" /></button>
            </div>
        </header>
    )
}

export default ConversationHeader
