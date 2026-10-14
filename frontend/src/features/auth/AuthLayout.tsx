import {Outlet} from 'react-router-dom'
import AppLogo from '../../components/ui/AppLogo'

function AuthLayout() {
    return (
        <main className="grid min-h-screen place-items-center bg-(--color-app-bg) px-5 py-12 text-(--color-text) sm:px-8">
            <div className="w-full max-w-md">
                <AppLogo className="mb-8 justify-center" />
                <section className="rounded-(--radius-panel) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-panel) sm:p-8">
                    <Outlet/>
                </section>
                <p className="mt-6 text-center text-xs text-(--color-text-muted)">Secure conversations start here</p>
            </div>
        </main>
    )
}

export default AuthLayout
