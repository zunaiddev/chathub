import ConversationHeader from './ConversationHeader'
import MessageComposer from './MessageComposer'
import MessageHistory from './MessageHistory'
import type {ChatMessage, Conversation} from './types'

type ChatPanelProps = {
    conversation: Conversation
    messages: ChatMessage[]
    onSend: (text: string) => void
    onBack: () => void
}

function ChatPanel({conversation, messages, onSend, onBack}: ChatPanelProps) {
    return (
        <main className="absolute inset-0 z-1 flex min-w-0 flex-col bg-(--color-app-bg) md:static md:z-auto md:flex-1">
            <ConversationHeader conversation={conversation} onBack={onBack}/>
            <MessageHistory messages={messages}/>
            <MessageComposer onSend={onSend}/>
        </main>
    )
}

export default ChatPanel
