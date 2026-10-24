import axios, {type AxiosResponse, HttpStatusCode} from 'axios'

export type ApiError = {
    code: string
    message: string
}

export type ApiResponseShape<TPayload> = {
    success: boolean
    status: HttpStatusCode
    payload: TPayload | null
    error: ApiError | null
}

export class ApiResponse<TPayload> {
    readonly success: boolean
    readonly status: HttpStatusCode
    readonly payload: TPayload | null
    readonly error: ApiError | null

    private constructor(response: ApiResponseShape<TPayload>) {
        this.success = response.success
        this.status = response.status
        this.payload = response.payload
        this.error = response.error
    }

    static success<TPayload>(response: AxiosResponse<TPayload>): ApiResponse<TPayload> {
        return new ApiResponse<TPayload>({
            success: true,
            status: response.status,
            payload: response.data,
            error: null,
        });
    }

    static error<TPayload>(error: unknown): ApiResponse<TPayload> {
        const apiError = this.normalizeError(error)
        const status = axios.isAxiosError(error) && error.response
            ? error.response.status as HttpStatusCode
            : HttpStatusCode.InternalServerError

        return new ApiResponse<TPayload>({
            success: false,
            status,
            payload: null,
            error: apiError,
        });
    }

    private static normalizeError(error: unknown): ApiError {
        if (axios.isAxiosError<{ success?: unknown; code?: unknown; message?: unknown }>(error)) {
            const responseError = error.response?.data

            return {
                code: typeof responseError?.code === 'string'
                    ? responseError.code
                    : error.code ?? 'REQUEST_FAILED',
                message: typeof responseError?.message === 'string'
                    ? responseError.message
                    : error.message || 'The request could not be completed.',
            }
        }

        if (error instanceof Error) {
            return {code: 'UNKNOWN_ERROR', message: error.message}
        }

        return {
            code: 'UNKNOWN_ERROR',
            message: 'An unexpected error occurred.',
        }
    }
}
