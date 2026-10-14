import type { ChatMessage } from './types'

type MessageHistoryProps = {
  messages: ChatMessage[]
}

function MessageHistory({ messages }: MessageHistoryProps) {
  function renderMessage(message: ChatMessage) {
    return (
      <div key={message.id} className={`mb-3 flex ${message.own ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[min(75%,480px)] rounded-xl border px-3 py-2 shadow-(--shadow-panel) ${message.own ? 'rounded-tr-sm border-(--color-brand-soft) bg-(--color-message-own)' : 'rounded-tl-sm border-(--color-border) bg-(--color-message-other)'}`}>
          <p className="overflow-wrap-anywhere m-0 text-[13px] leading-relaxed text-(--color-text)">{message.text}</p>
          <time className="mt-1 block text-right text-[9px] text-(--color-text-muted)">{message.time}{message.own && <span className="text-(--color-brand-hover)" aria-label="Sent"> ✓</span>}</time>
        </div>
      </div>
    )
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-(--color-app-bg) bg-[radial-gradient(rgb(148_163_184_/_0.045)_0.7px,transparent_0.7px)] bg-size-[18px_18px] px-[clamp(14px,6vw,84px)] pt-6 pb-4" aria-label="Message history">
      <div className="mb-6 flex justify-center"><span className="rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-[10px] text-(--color-text-muted)">Today</span></div>
      {messages.map(renderMessage)}
      <div className="mt-auto self-center rounded-full bg-(--color-surface) px-3 py-1.5 text-center text-[10px] text-(--color-text-muted)">You’re viewing a sample conversation</div>
    </section>
  )
}

export default MessageHistory
