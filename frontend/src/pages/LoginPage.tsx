import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
import AuthLink from '../components/fields/AuthLink.tsx'
import Button from '../components/fields/Button.tsx'
import InputField from '../components/fields/InputField.tsx'
import {AuthService} from '../lib/api/AuthService.ts'
import {emailValidationRules, loginPasswordValidationRules} from '../validation/authValidation.ts'
import {saveAccessToken} from '../lib/api/authToken.ts'
import {UserService} from '../lib/api/UserService.ts'

type LoginFormValues = {
    email: string
    password: string
}

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginFormValues>()

    async function onSubmit(values: LoginFormValues) {
        const response = await AuthService.login(values)

        if (response.success) {
            if (response.payload?.accessToken) {
                saveAccessToken(response.payload.accessToken)
                const profileResponse = await UserService.getCurrentUser()
                if (!profileResponse.success) {
                    toast.error(profileResponse.error?.message ?? 'Unable to load your profile.')
                    return
                }
            }
            toast.success('Logged in successfully.')
            return
        }

        if (response.status < 500) {
            toast.error(response.error?.message ?? 'Unable to log in.')
        }
    }

    return (
        <>
            <div className="mb-7">
                <p className="text-sm font-medium text-(--color-brand-hover)">Welcome back</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-(--color-text)">Log in to ChatHub</h1>
                <p className="mt-2 text-sm leading-6 text-(--color-text-secondary)">Pick up where your team left
                    off.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputField
                    id="email"
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    registration={register('email', emailValidationRules)}
                    error={errors.email}
                />
                <InputField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    registration={register('password', loginPasswordValidationRules)}
                    error={errors.password}
                />
                <Button type="submit" isSubmitting={isSubmitting}>
                    Log in
                </Button>
            </form>

            <AuthLink prompt="New to ChatHub?" to="/auth/signup">
                Create an account
            </AuthLink>
        </>
    )
}

export default LoginPage
