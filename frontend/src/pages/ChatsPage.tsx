import {useState} from 'react'
import ChatPanel from '../components/chat/ChatPanel.tsx'
import ChatSidebar from '../components/chat/ChatSidebar.tsx'
import {conversations, sampleMessages} from '../data/chatData.ts'
import type {ChatMessage} from '../types/chat.types.ts'

function ChatsPage() {
    const [selectedId, setSelectedId] = useState(conversations[0].id)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [messages, setMessages] = useState(sampleMessages)
    const selectedConversation = conversations.find(function findConversation(conversation) {
        return conversation.id === selectedId
    }) ?? conversations[0]

    function selectConversation(id: string) {
        setSelectedId(id)
        setMobileOpen(false)
    }

    function addSampleMessage(text: string) {
        const now = new Date()
        const nextMessage: ChatMessage = {
            id: `sample-${now.getTime()}`,
            text,
            time: now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            own: true,
        }
        setMessages(function appendMessage(currentMessages) {
            return [...currentMessages, nextMessage]
        })
    }

    return (
        <div className="min-h-screen bg-(--color-app-bg)">
            <div
                className="relative mx-auto flex h-dvh min-h-0 overflow-hidden border-0 bg-(--color-surface) shadow-(--shadow-panel) md:min-h-140 md:border md:border-(--color-border)">
                <ChatSidebar conversations={conversations} selectedId={selectedId} onSelect={selectConversation}
                             mobileOpen={mobileOpen}/>
                <ChatPanel conversation={selectedConversation} messages={messages} onSend={addSampleMessage}
                           onBack={function showConversations() {
                               setMobileOpen(true)
                           }}/>
            </div>
        </div>
    )
}

export default ChatsPage
