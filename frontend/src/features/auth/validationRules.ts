import type { RegisterOptions } from 'react-hook-form'

type NameFormValues = { name: string }
type EmailFormValues = { email: string }
type PasswordFormValues = { password: string }

export const nameValidationRules: RegisterOptions<NameFormValues, 'name'> = {
  required: 'Name is required.',
  minLength: {
    value: 3,
    message: 'Name must contain between 3 and 80 characters.',
  },
  maxLength: {
    value: 80,
    message: 'Name must contain between 3 and 80 characters.',
  },
  pattern: {
    value: /^[a-zA-Z ]+$/,
    message: 'Name must contain only letters and spaces.',
  },
}

export const emailValidationRules: RegisterOptions<EmailFormValues, 'email'> = {
  required: 'Email is required.',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please provide a valid email address.',
  },
}

export const registrationPasswordValidationRules: RegisterOptions<PasswordFormValues, 'password'> = {
  required: 'Password is required.',
  minLength: {
    value: 8,
    message: 'Password must contain between 8 and 128 characters.',
  },
  maxLength: {
    value: 128,
    message: 'Password must contain between 8 and 128 characters.',
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])\S+$/,
    message: 'Password must contain uppercase, lowercase, numeric, and special characters, with no spaces.',
  },
}

export const loginPasswordValidationRules: RegisterOptions<PasswordFormValues, 'password'> = {
  required: 'Password is required.',
}
