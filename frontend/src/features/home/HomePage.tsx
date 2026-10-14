import AppLogo from '../../components/ui/AppLogo'

function HomePage() {
  function renderTechnology(technology: string) {
    return (
      <span
        key={technology}
        className="rounded-full border border-(--color-border) bg-(--color-surface-subtle) px-4 py-2 text-sm font-medium text-(--color-text-secondary)"
      >
        {technology}
      </span>
    )
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl place-items-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-(--radius-panel) border border-(--color-border) bg-(--color-surface) p-8 shadow-(--shadow-panel) sm:p-12">
        <AppLogo className="mb-4" imageClassName="size-12" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-(--color-text) sm:text-5xl">
          Your project is ready to grow.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-(--color-text-secondary)">
          The app now has array-based routing and a shared root layout. Add new
          pages under features and register them in the route definitions.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'].map(renderTechnology)}
        </div>
      </section>
    </main>
  )
}

export default HomePage
