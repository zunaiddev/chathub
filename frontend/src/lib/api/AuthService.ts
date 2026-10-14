import {ApiResponse} from './ApiResponse'
import publicApi from './public'

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
    ): Promise<ApiResponse<AuthPayload> | ApiResponse<never>> {
        try {
            const response = await publicApi.post<AuthPayload>('/auth/login', request, {
                withCredentials: true,
            })
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
}