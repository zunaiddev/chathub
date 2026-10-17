import type {ReactNode} from 'react'
import {Link} from 'react-router-dom'

type AuthLinkProps = {
    prompt: string
    to: string
    children: ReactNode
}

function AuthLink({prompt, to, children}: AuthLinkProps) {
    return (
        <p className="mt-6 text-center text-sm text-(--color-text-secondary)">
            {prompt}{' '}
            <Link to={to}
                  className="font-medium text-(--color-brand-hover) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)">
                {children}
            </Link>
        </p>
    )
}

export default AuthLink
