import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
import AuthLink from '../../components/ui/AuthLink'
import Button from '../../components/ui/Button'
import InputField from '../../components/ui/InputField.tsx'
import {AuthService} from '../../lib/api/AuthService'
import {
    emailValidationRules,
    nameValidationRules,
    registrationPasswordValidationRules,
} from './validationRules'

type SignUpFormValues = {
    name: string
    email: string
    password: string
}

function SignUpPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<SignUpFormValues>()

    async function onSubmit(values: SignUpFormValues) {
        const response = await AuthService.signup(values)

        if (response.success) {
            toast.success('Account created successfully.')
            return
        }

        if (response.error?.code === 'CONFLICT') {
            setError('email', {
                type: 'server',
                message: response.error.message,
            })
            return
        }

        if (response.status < 500) {
            toast.error(response.error?.message ?? 'Unable to create your account.')
        }
    }

    return (
        <>
            <div className="mb-7">
                <p className="text-sm font-medium text-(--color-brand-hover)">Get started for free</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-(--color-text)">Create your account</h1>
                <p className="mt-2 text-sm leading-6 text-(--color-text-secondary)">Join your team and bring every conversation
                    together.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputField
                    id="name"
                    label="Full name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    registration={register('name', nameValidationRules)}
                    error={errors.name}
                />
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
                    autoComplete="new-password"
                    placeholder="8–128 characters, mixed case, number & symbol"
                    registration={register('password', registrationPasswordValidationRules)}
                    error={errors.password}
                />
                <Button type="submit" isSubmitting={isSubmitting}>
                    Create account
                </Button>
            </form>

            <AuthLink prompt="Already have an account?" to="/auth/login">
                Log in
            </AuthLink>
        </>
    )
}

export default SignUpPage
