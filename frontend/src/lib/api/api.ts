import axios, {AxiosError, type AxiosResponse} from 'axios'
import toast from 'react-hot-toast'
import {JwtService} from "../../service/jwt.service.ts";

const baseURL = import.meta.env.VITE_API_BASE_URL;

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
    async (config) => {
        const {token} = await JwtService.getAccessToken();

        if (!token) {
            window.location.assign("/auth/login");

            return Promise.reject(
                new AxiosError("Access token is missing")
            );
        }

        config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => Promise.reject(error)
);

function handleResponse(response: AxiosResponse) {
    return response;
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

export {publicApi, protectedApi};