import {createBrowserRouter} from 'react-router-dom'
import RootLayout from './RootLayout'
import AuthLayout from '../features/auth/AuthLayout'
import LoginPage from '../features/auth/LoginPage'
import SignUpPage from '../features/auth/SignUpPage'
import HomePage from '../features/home/HomePage'
import NotFoundPage from '../features/not-found/NotFoundPage'
import ChatsPage from '../features/chats/ChatsPage'
import TestPage from "./TestPage.tsx";

const routeDefinitions = [
    {
        element: <RootLayout/>,
        children: [
            {path: '/', element: <HomePage/>},
            {path: '/chats', element: <ChatsPage/>},
            {
                path: '/auth',
                element: <AuthLayout/>,
                children: [
                    {path: 'signup', element: <SignUpPage/>},
                    {path: 'login', element: <LoginPage/>},
                ],
            },
            {path: '/test', element: <TestPage/>},
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]

export const router = createBrowserRouter(routeDefinitions)
