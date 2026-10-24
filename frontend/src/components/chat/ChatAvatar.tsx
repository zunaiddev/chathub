type ChatAvatarProps = {
    initials: string
    color: string
    online?: boolean
    size?: 'small' | 'large'
}

function ChatAvatar({initials, color, online = false, size = 'small'}: ChatAvatarProps) {
    return (
        <span
            className={`relative inline-grid size-11 shrink-0 place-items-center rounded-full text-xs font-bold tracking-wide text-white ${color} ${size === 'large' ? 'size-12' : ''}`}
            aria-hidden="true">
      {initials}
            {online && <span
                className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-(--color-surface) bg-(--color-online)"/>}
    </span>
    )
}

export default ChatAvatar
