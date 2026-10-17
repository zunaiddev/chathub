import {ApiResponse} from './ApiResponse'
import {getAccessToken} from './authToken'
import publicApi from './public'

export type UserSearchResult = {
    id: number
    name: string
    email: string
}

export type CurrentUser = UserSearchResult & {
    role: string
    locked: boolean
    enabled: boolean
    createdAt: string
    updatedAt: string
}

export class UserService {
    static async getCurrentUser(): Promise<ApiResponse<CurrentUser> | ApiResponse<never>> {
        try {
            const accessToken = getAccessToken()
            if (!accessToken) {
                return ApiResponse.error(new Error('Authentication token is missing.'))
            }

            const response = await publicApi.get<CurrentUser>('/users', {
                headers: {Authorization: `Bearer ${accessToken}`},
            })
            return ApiResponse.success(response)
        } catch (error: unknown) {
            return ApiResponse.error(error)
        }
    }

    static async searchByEmail(email: string): Promise<ApiResponse<UserSearchResult> | ApiResponse<never>> {
        try {
            const accessToken = getAccessToken()
            if (!accessToken) {
                return ApiResponse.error(new Error('Please log in to search for people.'))
            }

            const response = await publicApi.get<UserSearchResult>('/users/search', {
                params: {email},
                headers: {Authorization: `Bearer ${accessToken}`},
            })
            return ApiResponse.success(response)
        } catch (error: unknown) {
            return ApiResponse.error(error)
        }
    }
}
