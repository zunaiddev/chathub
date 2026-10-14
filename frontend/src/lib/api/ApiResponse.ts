import axios, { HttpStatusCode, type AxiosResponse } from 'axios'

export type ApiError = {
  code: string
  message: string
}

export type ApiResponseShape<TPayload, TError = ApiError> = {
  success: boolean
  status: HttpStatusCode
  payload: TPayload | null
  error: TError | null
}

export class ApiResponse<TPayload, TError = ApiError> {
  readonly success: boolean
  readonly status: HttpStatusCode
  readonly payload: TPayload | null
  readonly error: TError | null

  private constructor(response: ApiResponseShape<TPayload, TError>) {
    this.success = response.success
    this.status = response.status
    this.payload = response.payload
    this.error = response.error
  }

  static success<TPayload>(response: AxiosResponse<TPayload>): ApiResponse<TPayload, never> {
    return new ApiResponse<TPayload, never>({
      success: true,
      status: response.status,
      payload: response.data,
      error: null,
    })
  }

  static error(error: unknown): ApiResponse<never, ApiError> {
    const apiError = this.normalizeError(error)
    const status = axios.isAxiosError(error) && error.response
      ? error.response.status as HttpStatusCode
      : HttpStatusCode.InternalServerError

    return new ApiResponse<never, ApiError>({
      success: false,
      status,
      payload: null,
      error: apiError,
    })
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
      return { code: 'UNKNOWN_ERROR', message: error.message }
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred.',
    }
  }
}
