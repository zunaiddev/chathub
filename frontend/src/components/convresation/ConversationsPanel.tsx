import type {JSX, ReactNode} from "react";
import Button from "../fields/Button.tsx";

type ConversationsPanelProps = {
    isLoading: boolean
    conversations: unknown[]
    errorMessage: string | null
    onRetry: () => void
}

function ConversationsPanel({isLoading, conversations, errorMessage, onRetry}: ConversationsPanelProps): JSX.Element {
    if (isLoading) {
        return <Container>
            <p className="px-5 py-8 text-center text-sm text-(--color-text-muted)" role="status">
                Loading conversations…
            </p>
        </Container>
    }

    if (errorMessage) {
        return <Container>
            <div className="space-y-3 px-5 py-6" role="alert">
                <p className="text-center text-sm text-(--color-text-secondary)">{errorMessage}</p>
                <Button onClick={onRetry}>Retry</Button>
            </div>
        </Container>
    }

    if (conversations.length === 0) {
        return <Container>
            <p className="px-5 py-8 text-center text-sm text-(--color-text-muted)">No conversations yet.</p>
        </Container>
    }

    return <Container>
        <ul className="space-y-2 overflow-y-auto px-3 pb-4">
            {conversations.map(function renderConversation(conversation, index) {
                return <li key={index}
                           className="wrap-break-word rounded-(--radius-control) border border-(--color-border) bg-(--color-surface-subtle) px-3 py-3 text-sm text-(--color-text-secondary)">
                    {formatConversation(conversation)}
                </li>
            })}
        </ul>
    </Container>
}

type ContainerProps = {
    children: ReactNode
}

function Container({children}: ContainerProps): JSX.Element {
    return <div className="min-h-0 w-full flex-1 overflow-y-auto">
        {children}
    </div>
}

function formatConversation(conversation: unknown): string {
    if (typeof conversation === 'string') {
        return conversation
    }

    try {
        return JSON.stringify(conversation) ?? 'Conversation'
    } catch {
        return 'Conversation'
    }
}

export default ConversationsPanel;