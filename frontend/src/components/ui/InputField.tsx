import {type InputHTMLAttributes, useState} from 'react';
import type {FieldError, UseFormRegisterReturn} from 'react-hook-form';
import EyeIcon from '../../icons/EyeIcon'
import EyeOffIcon from '../../icons/EyeOffIcon';

type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
    label: string
    registration: UseFormRegisterReturn
    error?: FieldError
}

function InputField({label, id, registration, error, ...inputProps}: InputFieldProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const inputId = id ?? registration.name;
    const errorId = `${inputId}-error`;
    const isPassword = inputProps.type === 'password'

    function togglePasswordVisibility() {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <div className="space-y-2">
            <label htmlFor={inputId} className="block text-sm font-medium text-(--color-text-secondary)">
                {label}
            </label>
            <div className="relative">
                <input
                    id={inputId}
                    {...registration}
                    {...inputProps}
                    type={isPassword && isPasswordVisible ? 'text' : inputProps.type}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errorId : undefined}
                    className={`w-full rounded-(--radius-control) border bg-(--color-app-bg) px-3.5 py-3 text-sm text-(--color-text) outline-none transition focus:border-(--color-focus) focus:ring-4 focus:ring-(--color-focus)/15 ${isPassword ? 'pr-11' : ''} ${
                        error ? 'border-(--color-danger)' : 'border-(--color-border-strong)'
                    }`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                        aria-pressed={isPasswordVisible}
                        className="absolute inset-y-0 right-0 grid w-11 place-items-center text-(--color-text-muted) transition hover:text-(--color-text) focus:outline-none"
                    >
                        {isPasswordVisible ? <EyeOffIcon className="size-5"/> : <EyeIcon className="size-5"/>}
                    </button>
                )}
            </div>
            {error && (
                <p id={errorId} role="alert" className="text-sm text-(--color-danger)">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default InputField
