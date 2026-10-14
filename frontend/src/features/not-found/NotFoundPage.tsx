import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="mx-auto grid min-h-screen max-w-6xl place-items-center px-6 py-16 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--color-brand-hover)">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-(--color-text)">
          Page not found
        </h1>
        <p className="mt-4 text-(--color-text-secondary)">The page you requested does not exist.</p>
        <Link
          to="/"
          className="mt-7 inline-flex rounded-(--radius-control) bg-(--color-brand) px-4 py-2.5 text-sm font-semibold text-(--color-text-on-brand) transition hover:bg-(--color-brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
        >
          Go home
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
