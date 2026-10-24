import type {ChatMessage, Conversation} from '../types/chat.types.ts'

export const conversations: Conversation[] = [
    {
        id: 'maya',
        name: 'Maya Patel',
        initials: 'MP',
        preview: 'That sounds good to me!',
        time: '10:42',
        color: 'avatar-blue',
        unread: 2,
        online: true
    },
    {
        id: 'design',
        name: 'Design team',
        initials: 'DT',
        preview: 'Alex: Shared the latest screens',
        time: '9:18',
        color: 'avatar-violet',
        unread: 4
    },
    {
        id: 'sam',
        name: 'Sam Rivera',
        initials: 'SR',
        preview: 'You: See you tomorrow 👋',
        time: 'Yesterday',
        color: 'avatar-amber'
    },
    {
        id: 'weekend',
        name: 'Weekend plans',
        initials: 'WP',
        preview: 'Jordan: Count me in!',
        time: 'Yesterday',
        color: 'avatar-green',
        unread: 1
    },
    {
        id: 'noah',
        name: 'Noah Kim',
        initials: 'NK',
        preview: 'The photos came out great',
        time: 'Tue',
        color: 'avatar-rose'
    },
    {
        id: 'product',
        name: 'Product updates',
        initials: 'PU',
        preview: 'Priya: Release notes are ready',
        time: 'Mon',
        color: 'avatar-teal'
    },
    {
        id: 'ellie',
        name: 'Ellie Chen',
        initials: 'EC',
        preview: 'Thanks for the help!',
        time: 'Mon',
        color: 'avatar-violet'
    },
]

export const sampleMessages: ChatMessage[] = [
    {id: 'm1', text: 'Hey! How is the new project coming along?', time: '10:36', own: false},
    {id: 'm2', text: 'Really well. I finished the first pass of the dashboard this morning.', time: '10:38', own: true},
    {id: 'm3', text: 'Nice! I’d love to take a look when you have a moment.', time: '10:39', own: false},
    {id: 'm4', text: 'Absolutely — I’ll send it over after I tidy up a couple of details.', time: '10:40', own: true},
    {id: 'm5', text: 'That sounds good to me!', time: '10:42', own: false},
]
