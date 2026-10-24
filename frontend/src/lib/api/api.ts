import axios, {type AxiosResponse} from 'axios'
import toast from 'react-hot-toast'
import {getAccessToken} from './authToken'

const baseURL = import.meta.env.VITE_API_BASE_URL

const publicApi = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const protectedApi = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

protectedApi.interceptors.request.use(
    function addAuthorizationHeader(config) {
        const accessToken = getAccessToken()

        if (!accessToken) {
            if (typeof window !== 'undefined' && window.location.pathname !== '/auth/login') {
                window.location.assign('/auth/login')
            }

            return Promise.reject(new Error('Authentication token is missing.'))
        }

        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    },
)

function handleResponse(response: AxiosResponse) {
    return response
}

function handleResponseError(error: unknown) {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            toast.error('Unable to reach the server. Check your internet connection and try again.')
        } else if (error.response.status >= 500) {
            toast.error('The server is not responding right now. Please try again later.')
        }
    }

    return Promise.reject(error);
}

publicApi.interceptors.response.use(
    handleResponse,
    handleResponseError,
)

protectedApi.interceptors.response.use(
    handleResponse,
    handleResponseError,
);

export {publicApi, protectedApi}
export default publicApi
