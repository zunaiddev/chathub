import {ApiResponse} from '../lib/api/ApiResponse.ts'
import {publicApi} from '../lib/api/api.ts'
import type {AxiosResponse} from "axios";

export type LoginRequest = {
    email: string
    password: string
}

export type SignupRequest = LoginRequest & {
    name: string
}

export type AuthPayload = {
    id: number
    accessToken: string
}

export class AuthService {
    static async login(
        request: LoginRequest,
    ): Promise<ApiResponse<AuthPayload>> {
        try {
            const response = await publicApi.post<AuthPayload>('/auth/login', request, {
                withCredentials: true,
            });
            return ApiResponse.success(response);
        } catch (error: unknown) {
            return ApiResponse.error(error);
        }
    }

    static async signup(
        request: SignupRequest,
    ): Promise<ApiResponse<AuthPayload> | ApiResponse<never>> {
        try {
            const response = await publicApi.post<AuthPayload>('/auth/register', request, {
                withCredentials: true,
            });
            return ApiResponse.success(response);
        } catch (error: unknown) {
            return ApiResponse.error(error);
        }
    }

    static async refreshToken(): Promise<ApiResponse<AuthPayload>> {
        try {
            const response: AxiosResponse = await publicApi.get<AuthPayload>('/auth/refresh', {
                withCredentials: true,
            });

            return ApiResponse.success(response);
        } catch (error: unknown) {
            return ApiResponse.error(error);
        }
    }

    static async logout() {
        try {
            const response: AxiosResponse = await publicApi.get('/auth/logout', {
                withCredentials: true,
            });

            return ApiResponse.success(response);
        } catch (error: unknown) {
            return ApiResponse.error(error);
        }
    }
}