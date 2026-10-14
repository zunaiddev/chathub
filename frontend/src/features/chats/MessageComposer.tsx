import { useState } from 'react'
import ChatIcon from './ChatIcon'

type MessageComposerProps = {
  onSend: (text: string) => void
}

function MessageComposer({ onSend }: MessageComposerProps) {
  const [draft, setDraft] = useState('')

  function submitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    onSend(text)
    setDraft('')
  }

  return (
    <form className="flex min-h-[68px] shrink-0 items-center gap-2 border-t border-(--color-border) bg-(--color-surface) px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:gap-2.5 md:px-12" onSubmit={submitMessage}>
      <button type="button" className="grid size-9 shrink-0 place-items-center rounded-full bg-transparent text-(--color-text-muted) hover:bg-(--color-surface-hover) md:size-[38px]" aria-label="Add attachment"><ChatIcon name="attachment" /></button>
      <label className="flex h-11 min-w-0 flex-1 items-center gap-1.5 rounded-full border border-(--color-border) bg-(--color-surface-subtle) px-3 focus-within:border-(--color-border-strong)">
        <span className="sr-only">Type a message</span>
        <input className="w-full min-w-0 border-0 bg-transparent py-2 text-[13px] text-(--color-text) outline-none placeholder:text-(--color-text-muted)" value={draft} onChange={function updateDraft(event) { setDraft(event.currentTarget.value) }} placeholder="Type a message" />
        <button type="button" className="grid size-[30px] shrink-0 place-items-center rounded-full bg-transparent text-(--color-text-muted) hover:bg-(--color-surface-hover)" aria-label="Add emoji"><ChatIcon name="emoji" className="size-[18px]" /></button>
      </label>
      <button type="submit" className="grid size-10 shrink-0 place-items-center rounded-full bg-(--color-brand) text-(--color-text-on-brand) hover:bg-(--color-brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) disabled:cursor-default disabled:bg-(--color-surface-hover) disabled:text-(--color-text-muted)" aria-label="Send message" disabled={!draft.trim()}><ChatIcon name="send" /></button>
    </form>
  )
}

export default MessageComposer
