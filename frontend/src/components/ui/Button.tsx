import type {ButtonHTMLAttributes, ReactNode} from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isSubmitting?: boolean
    children?: ReactNode
}

function Spinner() {
    return (
        <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
        />
    )
}

function Button({
                    isSubmitting = false,
                    disabled,
                    type = 'button',
                    className = '',
                    children,
                    ...buttonProps
                }: ButtonProps) {
    const isDisabled = disabled || isSubmitting

    return (
        <button
            {...buttonProps}
            type={type}
            disabled={isDisabled}
            aria-busy={isSubmitting}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-(--radius-control) bg-(--color-brand) px-4 py-3 text-sm font-semibold text-(--color-text-on-brand) transition hover:bg-(--color-brand-hover) focus:outline-none focus:ring-4 focus:ring-(--color-focus)/30 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
            {isSubmitting && <Spinner/>}
            {children}
        </button>
    )
}

export default Button
