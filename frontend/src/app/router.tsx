import {createBrowserRouter} from 'react-router-dom'
import RootLayout from './RootLayout'
import AuthLayout from '../layout/AuthLayout.tsx'
import LoginPage from '../pages/LoginPage.tsx'
import SignUpPage from '../pages/SignUpPage.tsx'
import HomePage from '../pages/HomePage.tsx'
import NotFoundPage from '../pages/NotFoundPage.tsx'
import ChatsPage from '../pages/ChatsPage.tsx'
import TestPage from "../pages/TestPage.tsx";

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
