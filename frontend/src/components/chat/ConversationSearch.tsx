import type {JSX} from "react";
import ChatIcon from "./ChatIcon.tsx";

interface Props {
    query: string;
    setQuery: (query: string) => void;
}

function ConversationSearch({query, setQuery}: Props): JSX.Element {
    return (<label
        className="mx-4 mb-4.5 flex h-10 items-center gap-2.5 rounded-(--radius-control) bg-(--color-surface-subtle) px-3 text-(--color-text-muted) focus-within:border focus-within:border-(--color-border-strong)">
        <ChatIcon name="search" className="size-4.5 shrink-0"/>
        <span className="sr-only">Search conversations</span>
        <input
            className="w-full min-w-0 border-0 bg-transparent text-[13px] text-(--color-text) outline-none placeholder:text-(--color-text-muted)"
            value={query} onChange={function updateQuery(event) {
            setQuery(event.currentTarget.value)
        }} placeholder="Search or start a new chat"/>
        {query && <button type="button" className="border-0 bg-transparent text-(--color-text-muted)"
                          aria-label="Clear search" onClick={function clearQuery() {
            setQuery('')
        }}><ChatIcon name="close" className="size-4"/></button>}
    </label>);
}

export default ConversationSearch;