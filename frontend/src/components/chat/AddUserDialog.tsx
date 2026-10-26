import {type FormEvent, useState} from 'react'
import {emailValidationRules} from '../../validation/authValidation.ts'
import type {UserSearchResult} from '../../service/UserService.ts'
import ChatIcon from './ChatIcon.tsx'

type AddUserDialogProps = {
    open: boolean
    isSearching: boolean
    user: UserSearchResult | null
    errorMessage: string
    onClose: () => void
    onSearch: (email: string) => void
}

function AddUserDialog({open, isSearching, user, errorMessage, onClose, onSearch}: AddUserDialogProps) {
    const [email, setEmail] = useState('')
    const [validationMessage, setValidationMessage] = useState('')

    function submitSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const value = email.trim()
        const emailPatternRule = emailValidationRules.pattern
        const emailPattern = emailPatternRule && typeof emailPatternRule !== 'string' && 'value' in emailPatternRule
            ? emailPatternRule.value
            : emailPatternRule
        if (!value) {
            setValidationMessage('Email is required.')
            return
        }
        if (emailPattern instanceof RegExp && !emailPattern.test(value)) {
            setValidationMessage('Please provide a valid email address.')
            return
        }
        setValidationMessage('')
        onSearch(value)
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-20 grid place-items-center bg-black/60 p-4" role="presentation"
             onMouseDown={function closeOnBackdrop(event) {
                 if (event.target === event.currentTarget) onClose()
             }}>
            <section
                className="w-full max-w-md rounded-(--radius-panel) border border-(--color-border) bg-(--color-surface) p-5 shadow-(--shadow-panel)"
                role="dialog" aria-modal="true" aria-labelledby="add-user-title">
                <header className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h2 id="add-user-title" className="text-lg font-semibold text-(--color-text)">Add a person</h2>
                        <p className="mt-1 text-sm text-(--color-text-muted)">Search for someone by their email
                            address.</p>
                    </div>
                    <button type="button"
                            className="grid size-8 shrink-0 place-items-center rounded-full text-(--color-text-muted) hover:bg-(--color-surface-hover) focus-visible:outline-2 focus-visible:outline-(--color-focus)"
                            aria-label="Close" onClick={onClose}><ChatIcon name="close" className="size-4"/></button>
                </header>

                <form className="space-y-3" onSubmit={submitSearch} noValidate>
                    <label className="block text-sm font-medium text-(--color-text-secondary)"
                           htmlFor="user-search-email">Email address</label>
                    <div className="flex gap-2">
                        <input id="user-search-email"
                               className="h-11 min-w-0 flex-1 rounded-(--radius-control) border border-(--color-border) bg-(--color-surface-subtle) px-3 text-sm text-(--color-text) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
                               type="email" autoComplete="email" placeholder="name@example.com" value={email}
                               onChange={function updateEmail(event) {
                                   setEmail(event.currentTarget.value);
                                   setValidationMessage('')
                               }}/>
                        <button type="submit"
                                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-(--radius-control) bg-(--color-brand) px-4 text-sm font-semibold text-(--color-text-on-brand) hover:bg-(--color-brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) disabled:cursor-wait disabled:opacity-70"
                                disabled={isSearching}>
                            {isSearching ? 'Searching…' : <><ChatIcon name="search" className="size-4"/>Search</>}
                        </button>
                    </div>
                    {(validationMessage || errorMessage) && <p className="text-sm text-(--color-danger)"
                                                               role="alert">{validationMessage || errorMessage}</p>}
                </form>

                {user && (
                    <div
                        className="mt-5 flex items-center gap-3 rounded-(--radius-control) border border-(--color-border) bg-(--color-surface-subtle) p-3"
                        role="status">
                        <span
                            className="grid size-11 shrink-0 place-items-center rounded-full bg-(--color-brand-soft) text-sm font-semibold text-(--color-text)">{user.name.split(' ').map(function getInitial(part) {
                            return part[0]
                        }).slice(0, 2).join('').toUpperCase()}</span>
                        <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-(--color-text)">{user.name}</span>
              <span className="block truncate text-xs text-(--color-text-muted)">{user.email}</span>
            </span>
                    </div>
                )}
            </section>
        </div>
    )
}

export default AddUserDialog
