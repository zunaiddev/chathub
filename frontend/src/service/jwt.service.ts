import {jwtDecode, type JwtPayload as DecodedPayload} from "jwt-decode";
import type {AccessTokenPayload, JwtPayload} from "../types/jwt.types.ts";
import {type AuthPayload, AuthService} from "./AuthService.ts";
import type {ApiResponse} from "../lib/api/ApiResponse.ts";
import {HttpStatusCode} from "axios";

export class JwtService {
    private static readonly ACCESS_TOKEN_KEY: string = "token";

    static decode(token: string): JwtPayload | null {
        try {
            const payload: DecodedPayload = jwtDecode(token);

            if (!JwtService.isValiPayload(payload)) {
                return null;
            }

            return {
                subject: payload.sub as string,
                jti: payload.jti as string,
                exp: payload.exp as number,
                iat: payload.iat as number,
                userId: Number.parseInt(payload.sub as string),
                isExpired: payload.exp as number * 1000 <= Date.now(),
            }
        } catch {
            return null;
        }
    }

    static setToken(token: string): void {
        localStorage.setItem(JwtService.ACCESS_TOKEN_KEY, token);
    }

    static async getAccessToken(): Promise<AccessTokenPayload> {
        const token = localStorage.getItem(JwtService.ACCESS_TOKEN_KEY);

        if (!token) {
            return {token: null, cause: "NO_TOKEN"};
        }

        const payload: JwtPayload | null = JwtService.decode(token);


        if (!payload) {
            return {token: null, cause: "NO_TOKEN"};
        }

        if (payload.isExpired) {
            const {
                success,
                status,
                payload
            } : ApiResponse<AuthPayload> = await AuthService.refreshToken();

            if (success && payload) {
                JwtService.setToken(payload.accessToken);
                return {token: payload.accessToken};
            }

            if (status === HttpStatusCode.InternalServerError) {
                return {token: null, cause: "SERVER_ERROR"};
            }

            return {token: null, cause: "NO_TOKEN"};
        }

        return {token};
    }

    private static isValiPayload(payload: DecodedPayload): boolean {
        return !!(payload && payload.sub && payload.exp && payload.jti && payload.iat);
    }
}