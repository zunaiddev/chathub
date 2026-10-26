import {useEffect, useState} from 'react'
import ChatPanel from '../components/chat/ChatPanel.tsx'
import {conversations, sampleMessages} from '../data/chatData.ts'
import type {ChatMessage} from '../types/chat.types.ts'
import ChatSidebar from "../components/chat/ChatSidebar.tsx";
import {UserService} from "../service/UserService.ts";

function ChatsPage() {
    const [loadingChats, setLoadingChats] = useState<boolean>(true);
    const [loadedConversations, setLoadedConversations] = useState<unknown[]>([])
    const [conversationError, setConversationError] = useState<string | null>(null)
    const [retryCount, setRetryCount] = useState(0)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [messages, setMessages] = useState(sampleMessages)

    useEffect(function fetchConversations() {
        let isActive = true

        async function loadConversations() {
            try {
                const response = await UserService.getConversations()
                if (!isActive) {
                    return
                }

                if (response.success) {
                    setLoadedConversations(Array.isArray(response.payload) ? response.payload : [])
                    setConversationError(null)
                    return
                }

                setConversationError(response.error?.message ?? 'Could not load conversations.')
            } catch {
                if (isActive) {
                    setConversationError('Could not load conversations.')
                }
            } finally {
                if (isActive) {
                    setLoadingChats(false)
                }
            }
        }

        void loadConversations()

        return function cancelConversationRequest() {
            isActive = false
        }
    }, [retryCount]);

    function retryConversations() {
        setConversationError(null)
        setLoadingChats(true)
        setRetryCount(retryCount + 1)
    }

    function addConversation(conversation: unknown) {
        setLoadedConversations(function prependConversation(currentConversations) {
            return [conversation, ...currentConversations]
        })
        setConversationError(null)
    }

    function addSampleMessage(text: string) {
        setMessages(function appendSampleMessage(currentMessages) {
            const message: ChatMessage = {
                id: `m${currentMessages.length + 1}`,
                text,
                time: 'Now',
                own: true,
            }
            return [...currentMessages, message]
        })
    }

    return (
        <div className="min-h-screen bg-(--color-app-bg)">
            <div
                className="relative mx-auto flex h-dvh min-h-0 overflow-hidden border-0 bg-(--color-surface) shadow-(--shadow-panel) md:min-h-140 md:border md:border-(--color-border)">
                <ChatSidebar isLoading={loadingChats} conversations={loadedConversations}
                             errorMessage={conversationError} onRetry={retryConversations}
                             onConversationCreated={addConversation}
                             mobileOpen={mobileOpen}/>
                <ChatPanel conversation={conversations[0]} messages={messages} onSend={addSampleMessage}
                           onBack={function showConversations() {
                               setMobileOpen(true)
                           }}/>
            </div>
        </div>
    )
}

export default ChatsPage
