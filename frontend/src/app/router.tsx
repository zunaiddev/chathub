import {createBrowserRouter} from 'react-router-dom'
import RootLayout from './RootLayout'
import AuthLayout from '../features/auth/AuthLayout'
import LoginPage from '../features/auth/LoginPage'
import SignUpPage from '../features/auth/SignUpPage'
import HomePage from '../features/home/HomePage'
import NotFoundPage from '../features/not-found/NotFoundPage'

const routeDefinitions = [
    {
        element: <RootLayout/>,
        children: [
            {path: '/', element: <HomePage/>},
            {
                path: '/auth',
                element: <AuthLayout/>,
                children: [
                    {path: 'signup', element: <SignUpPage/>},
                    {path: 'login', element: <LoginPage/>},
                ],
            },
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]

export const router = createBrowserRouter(routeDefinitions)
