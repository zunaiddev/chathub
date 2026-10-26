export type Conversation = {
    id: string
    name: string
    initials: string
    preview: string
    time: string
    color: string
    unread?: number
    online?: boolean
}

export type ChatMessage = {
    id: string
    text: string
    time: string
    own: boolean
}