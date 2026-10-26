export interface JwtPayload {
    isExpired: boolean;
    subject: string;
    userId: number;
    jti: string;
    iat: number;
    exp: number;
}

export interface AccessTokenPayload {
    token: string | null;
    cause?: "NO_TOKEN" | "SERVER_ERROR";
}