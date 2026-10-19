export type JwtPayload = Record<string, unknown> & {
    exp?: number
}

export function extractPayload(token: string): JwtPayload {
    const segments = token.split('.');

    if (segments.length !== 3 || !segments[1]) {
        throw new Error('Invalid JWT format.');
    }

    const base64 = segments[1].replace(/-/g, '+').replace(/_/g, '/')
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')

    try {
        const payload: unknown = JSON.parse(atob(paddedBase64));

        if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
            throw new Error('Invalid JWT payload.')
        }

        return payload as JwtPayload
    } catch {
        throw new Error('Invalid JWT payload.')
    }
}

export function isTokenExpired(token: string): boolean {
    const payload = extractPayload(token)

    return typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now()
}