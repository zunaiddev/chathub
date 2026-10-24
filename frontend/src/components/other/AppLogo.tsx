import {Link} from 'react-router-dom'

type AppLogoProps = {
    to?: string
    className?: string
    imageClassName?: string
    showName?: boolean
}

function AppLogo({to = '/', className = '', imageClassName = '', showName = true}: AppLogoProps) {
    const content = (
        <>
            <img
                src="/logo.png"
                alt=""
                className={`size-10 shrink-0 object-contain ${imageClassName}`}
            />
            {showName && (
                <span className="text-xl font-semibold tracking-tight text-(--color-text)">
          ChatHub
        </span>
            )}
        </>
    )

    return (
        <Link to={to} aria-label="ChatHub home" className={`flex items-center gap-3 ${className}`}>
            {content}
        </Link>
    )
}

export default AppLogo
