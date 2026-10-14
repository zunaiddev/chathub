type ChatIconName = 'add' | 'search' | 'send' | 'attachment' | 'emoji' | 'back' | 'more' | 'close'

type ChatIconProps = {
  name: ChatIconName
  className?: string
}

function ChatIcon({ name, className = 'size-5' }: ChatIconProps) {
  const commonProps = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    focusable: false,
  }

  switch (name) {
    case 'add':
      return <svg {...commonProps}><path d="M12 5v14M5 12h14" /></svg>
    case 'search':
      return <svg {...commonProps}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
    case 'send':
      return <svg {...commonProps}><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
    case 'attachment':
      return <svg {...commonProps}><path d="m8.5 12.5 6.8-6.8a3.2 3.2 0 0 1 4.5 4.5l-8.6 8.6a5 5 0 0 1-7.1-7.1l8.2-8.2" /></svg>
    case 'emoji':
      return <svg {...commonProps}><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5s1.2 2 3.5 2 3.5-2 3.5-2M9 9.5h.01M15 9.5h.01" /></svg>
    case 'back':
      return <svg {...commonProps}><path d="m15 18-6-6 6-6" /></svg>
    case 'more':
      return <svg {...commonProps} fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
    case 'close':
      return <svg {...commonProps}><path d="m18 6-12 12M6 6l12 12" /></svg>
  }
}

export default ChatIcon
