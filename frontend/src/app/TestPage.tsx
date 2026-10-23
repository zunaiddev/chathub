import {Client} from '@stomp/stompjs'
import {type FormEvent, useEffect, useRef, useState} from 'react'

type ActiveSubscription = { destination: string; unsubscribe: () => void }
type ReceivedMessage = { id: number; body: string; receivedAt: string }

function TestPage() {
    const clientRef = useRef<Client | null>(null)
    const responseSubscriptionRef = useRef<ActiveSubscription | null>(null)
    const [endpoint, setEndpoint] = useState('ws://localhost:8080/api/ws')
    const [destination, setDestination] = useState('')
    const [responseDestination, setResponseDestination] = useState('')
    const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([])
    const [messageText, setMessageText] = useState('')
    const [authorization, setAuthorization] = useState('')
    const [includeAuthorization, setIncludeAuthorization] = useState(false)
    const [connectionState, setConnectionState] = useState('Disconnected')
    const [error, setError] = useState('')

    useEffect(function cleanupClient() {
        return function deactivateClient() {
            const client = clientRef.current
            clientRef.current = null
            responseSubscriptionRef.current = null

            if (client) {
                void client.deactivate()
            }
        }
    }, [])

    function connect() {
        if (clientRef.current?.active) {
            return
        }

        setError('')
        setConnectionState('Connecting')

        const connectHeaders: Record<string, string> = {}
        if (includeAuthorization && authorization.trim()) {
            connectHeaders.Authorization = authorization.trim()
        }

        const client = new Client({
            brokerURL: endpoint.trim(),
            connectHeaders,
            reconnectDelay: 0,
            debug: function logDebug(message) {
                console.debug(message)
            },
            onConnect: function handleConnect() {
                setConnectionState('Connected')
            },
            onWebSocketClose: function handleClose() {
                setConnectionState('Disconnected')
            },
            onWebSocketError: function handleWebSocketError() {
                setConnectionState('Error')
                setError('Could not connect to the WebSocket endpoint.')
            },
            onStompError: function handleStompError(frame) {
                setConnectionState('Error')
                setError(frame.headers.message || frame.body || 'The STOMP server returned an error.')
            },
        })

        clientRef.current = client
        void client.activate()
    }

    async function disconnect() {
        const client = clientRef.current
        if (!client) {
            setConnectionState('Disconnected')
            return
        }

        await client.deactivate()
        responseSubscriptionRef.current = null
        if (clientRef.current === client) {
            clientRef.current = null
        }
        setConnectionState('Disconnected')
    }

    function subscribeToResponses() {
        const client = clientRef.current
        const destinationValue = responseDestination.trim()

        if (!client?.connected || !destinationValue) {
            setError('Connect first and enter a response destination to subscribe.')
            return
        }

        responseSubscriptionRef.current?.unsubscribe()
        setReceivedMessages([])

        try {
            const subscription = client.subscribe(destinationValue, function handleResponse(message) {
                setReceivedMessages(function appendMessage(messages) {
                    return [...messages, {
                        id: Date.now() + Math.random(),
                        body: message.body,
                        receivedAt: new Date().toLocaleTimeString(),
                    }]
                })
            })
            responseSubscriptionRef.current = {
                destination: destinationValue, unsubscribe: function unsubscribeResponse() {
                    subscription.unsubscribe()
                }
            }
            setError('')
        } catch {
            setError('Could not subscribe to the response destination.')
        }
    }

    function unsubscribeFromResponses() {
        if (!responseSubscriptionRef.current) {
            setError('There is no active response subscription.')
            return
        }

        responseSubscriptionRef.current.unsubscribe()
        responseSubscriptionRef.current = null
        setError('')
    }

    function sendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const client = clientRef.current
        const destinationValue = destination.trim()
        const messageValue = messageText.trim()

        if (!client?.connected || !destinationValue || !messageValue) {
            setError('Connect first, enter a destination, and type a message to send.')
            return
        }

        try {
            client.publish({
                destination: destinationValue,
                body: JSON.stringify({message: messageValue}),
            })
            setMessageText('')
            setError('')
        } catch {
            setError('Could not send the message.')
        }
    }

    const isActive = connectionState === 'Connecting' || connectionState === 'Connected'

    return (
        <main
            className="flex min-h-screen items-center justify-center bg-(--color-app-bg) px-4 py-10 text-(--color-text)">
            <section
                className="w-full max-w-6xl rounded-(--radius-panel) border border-(--color-border) bg-(--color-surface) p-5 shadow-(--shadow-panel) sm:p-8">
                <header className="mb-7">
                    <p className="mb-2 text-sm font-medium text-(--color-brand-hover)">Developer tools</p>
                    <h1 className="text-2xl font-semibold">WebSocket test</h1>
                    <p className="mt-2 text-sm leading-6 text-(--color-text-secondary)">
                        Connect to a STOMP WebSocket endpoint, with an optional Authorization header.
                    </p>
                </header>

                <div className="grid gap-6 lg:grid-cols-2">
                    <section aria-label="Connection and publish" className="space-y-5">
                        <label className="block space-y-2 text-sm font-medium" htmlFor="websocket-endpoint">
                            <span>WebSocket endpoint</span>
                            <input
                                id="websocket-endpoint"
                                value={endpoint}
                                onChange={function updateEndpoint(event) {
                                    setEndpoint(event.target.value)
                                }}
                                placeholder="ws://localhost:8080/api/ws"
                                className="w-full rounded-(--radius-control) border border-(--color-border-strong) bg-(--color-app-bg) px-3 py-2.5 text-sm text-(--color-text) outline-none focus:border-(--color-focus) focus:ring-2 focus:ring-(--color-focus)/30"
                            />
                        </label>

                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-3 text-sm font-medium"
                                   htmlFor="include-authorization">
                                <input
                                    id="include-authorization"
                                    type="checkbox"
                                    checked={includeAuthorization}
                                    onChange={function updateIncludeAuthorization(event) {
                                        setIncludeAuthorization(event.target.checked)
                                    }}
                                    className="size-4 accent-(--color-brand) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
                                />
                                Send Authorization header
                            </label>
                            <label className="block space-y-2 text-sm font-medium" htmlFor="authorization-header">
                                <span>Authorization value</span>
                                <input
                                    id="authorization-header"
                                    type="text"
                                    value={authorization}
                                    onChange={function updateAuthorization(event) {
                                        setAuthorization(event.target.value)
                                    }}
                                    disabled={!includeAuthorization || isActive}
                                    placeholder="Bearer your-token"
                                    autoComplete="off"
                                    className="w-full rounded-(--radius-control) border border-(--color-border-strong) bg-(--color-app-bg) px-3 py-2.5 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-muted) focus:border-(--color-focus) focus:ring-2 focus:ring-(--color-focus)/30 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                                <span className="block text-xs font-normal text-(--color-text-muted)">
                                The value is sent as entered. Leave the checkbox off to omit the header.
                            </span>
                            </label>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-1">
                            <button
                                type="button"
                                onClick={connect}
                                disabled={isActive || !endpoint.trim()}
                                className="rounded-(--radius-control) bg-(--color-brand) px-5 py-2.5 text-sm font-semibold text-(--color-text-on-brand) hover:bg-(--color-brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Connect
                            </button>
                            <button
                                type="button"
                                onClick={function handleDisconnect() {
                                    void disconnect()
                                }}

                                className="rounded-(--radius-control) border border-(--color-border-strong) bg-(--color-surface-subtle) px-5 py-2.5 text-sm font-semibold text-(--color-text) hover:bg-(--color-surface-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Disconnect
                            </button>
                        </div>

                        <div className="space-y-3 border-t border-(--color-border) pt-5">
                            <label className="block space-y-2 text-sm font-medium" htmlFor="stomp-destination">
                                <span>Destination URL</span>
                                <input
                                    id="stomp-destination"
                                    value={destination}
                                    onChange={function updateDestination(event) {
                                        setDestination(event.target.value)
                                    }}
                                    placeholder="/app/messages"
                                    disabled={connectionState !== 'Connected'}
                                    className="w-full rounded-(--radius-control) border border-(--color-border-strong) bg-(--color-app-bg) px-3 py-2.5 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-muted) focus:border-(--color-focus) focus:ring-2 focus:ring-(--color-focus)/30 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </label>
                        </div>

                        <form onSubmit={sendMessage} className="space-y-3 border-t border-(--color-border) pt-5">
                            <label className="block space-y-2 text-sm font-medium" htmlFor="stomp-message">
                                    <span>Message</span>
                                <textarea
                                    id="stomp-message"
                                    value={messageText}
                                    onChange={function updateMessage(event) {
                                        setMessageText(event.target.value)
                                    }}
                                    placeholder="Type a message to send"
                                    rows={3}
                                    disabled={connectionState !== 'Connected'}
                                    className="w-full resize-y rounded-(--radius-control) border border-(--color-border-strong) bg-(--color-app-bg) px-3 py-2.5 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-muted) focus:border-(--color-focus) focus:ring-2 focus:ring-(--color-focus)/30 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </label>
                            <button
                                type="submit"
                                disabled={connectionState !== 'Connected' || !destination.trim() || !messageText.trim()}
                                className="rounded-(--radius-control) bg-(--color-brand) px-5 py-2.5 text-sm font-semibold text-(--color-text-on-brand) hover:bg-(--color-brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Send message
                            </button>
                            <p className="text-xs text-(--color-text-muted)">
                                Sends a STOMP SEND frame with JSON body {'{'}&quot;message&quot;: &quot;...&quot;{'}'}. No subscription is required.
                            </p>
                        </form>

                        <div
                            className="rounded-(--radius-control) border border-(--color-border) bg-(--color-surface-subtle) px-4 py-3"
                            aria-live="polite">
                            <p className="text-sm">
                                Status: <span
                                className={connectionState === 'Connected' ? 'font-semibold text-(--color-online)' : connectionState === 'Error' ? 'font-semibold text-(--color-danger)' : 'font-semibold text-(--color-text-secondary)'}>{connectionState}</span>
                            </p>
                            {error && <p className="mt-2 break-words text-sm text-(--color-danger)">{error}</p>}
                        </div>
                    </section>

                    <section aria-label="Response topic"
                             className="flex min-h-[34rem] flex-col space-y-5 rounded-(--radius-control) border border-(--color-border) bg-(--color-surface-subtle) p-4 sm:p-5">
                        <div>
                            <h2 className="text-lg font-semibold">Response listener</h2>
                            <p className="mt-1 text-sm text-(--color-text-secondary)">Subscribe to a topic and inspect
                                each response here.</p>
                        </div>
                        <label className="block space-y-2 text-sm font-medium" htmlFor="response-destination">
                            <span>Response destination</span>
                            <input
                                id="response-destination"
                                value={responseDestination}
                                onChange={function updateResponseDestination(event) {
                                    setResponseDestination(event.target.value)
                                }}
                                placeholder="/topic/responses"
                                disabled={connectionState !== 'Connected'}
                                className="w-full rounded-(--radius-control) border border-(--color-border-strong) bg-(--color-app-bg) px-3 py-2.5 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-muted) focus:border-(--color-focus) focus:ring-2 focus:ring-(--color-focus)/30 disabled:cursor-not-allowed disabled:opacity-60"
                            />
                        </label>
                        <div className="flex flex-wrap gap-3">
                            <button type="button" onClick={subscribeToResponses}
                                    disabled={connectionState !== 'Connected' || !responseDestination.trim()}
                                    className="rounded-(--radius-control) bg-(--color-brand) px-4 py-2.5 text-sm font-semibold text-(--color-text-on-brand) hover:bg-(--color-brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) disabled:cursor-not-allowed disabled:opacity-50">Subscribe
                            </button>
                            <button type="button" onClick={unsubscribeFromResponses}
                                    className="rounded-(--radius-control) border border-(--color-border-strong) bg-(--color-surface) px-4 py-2.5 text-sm font-semibold text-(--color-text) hover:bg-(--color-surface-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) disabled:cursor-not-allowed disabled:opacity-50">Unsubscribe
                            </button>
                        </div>
                        <p className="text-xs text-(--color-text-muted)" aria-live="polite">
                            {responseSubscriptionRef.current ? 'Listening to ' + responseSubscriptionRef.current.destination : 'Not subscribed'}
                        </p>
                        <div
                            className="min-h-0 flex-1 overflow-y-auto rounded-(--radius-control) border border-(--color-border) bg-(--color-app-bg) p-3"
                            aria-live="polite" aria-label="Received responses">
                            {receivedMessages.length === 0 ? (
                                <p className="py-8 text-center text-sm text-(--color-text-muted)">Responses will appear
                                    here.</p>
                            ) : (
                                <ol className="space-y-3">
                                    {receivedMessages.map(function renderMessage(message) {
                                        return <li key={message.id}
                                                   className="rounded-(--radius-control) border border-(--color-border) bg-(--color-surface) p-3">
                                            <p className="mb-2 text-xs text-(--color-text-muted)">{message.receivedAt}</p>
                                            <pre
                                                className="whitespace-pre-wrap break-words font-mono text-sm text-(--color-text-secondary)">{message.body}</pre>
                                        </li>
                                    })}
                                </ol>
                            )}
                        </div>
                    </section>
                </div>
            </section>
        </main>
    )
}

export default TestPage
