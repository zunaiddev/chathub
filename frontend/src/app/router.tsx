import {createBrowserRouter} from 'react-router-dom'
import RootLayout from './RootLayout'
import AuthLayout from '../layout/AuthLayout.tsx'
import LoginPage from '../pages/LoginPage.tsx'
import SignUpPage from '../pages/SignUpPage.tsx'
import NotFoundPage from '../pages/NotFoundPage.tsx'
import ChatsPage from '../pages/ChatsPage.tsx'
import ProfilePage from '../pages/ProfilePage.tsx'
import TestPage from "../pages/TestPage.tsx";
import ProtectedGuard from "../guard/ProtectedGuard.tsx";

const routeDefinitions = [
    {
        element: <RootLayout/>,
        children: [
            {path: '/', element: <ProtectedGuard><ChatsPage/></ProtectedGuard>},
            {path: '/profile', element: <ProtectedGuard><ProfilePage/></ProtectedGuard>},
            {
                path: '/auth',
                element: <ProtectedGuard isPublic><AuthLayout/></ProtectedGuard>,
                children: [
                    {path: 'signup', element: <SignUpPage/>},
                    {path: 'login', element: <LoginPage/>},
                ],
            },
            {
                path: '/test', element: <TestPage/>
            },
            {path: '*', element: <NotFoundPage/>},
        ],
    },
]

export const router = createBrowserRouter(routeDefinitions)
