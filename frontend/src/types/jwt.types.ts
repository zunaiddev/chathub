export interface JwtPayload {
    subject: string;
    userId: number;
    jti: string;
    iat: number;
    exp: number;
}