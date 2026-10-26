import {ApiResponse} from '../lib/api/ApiResponse.ts'
import {protectedApi} from '../lib/api/api.ts'

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
            const response = await protectedApi.get<CurrentUser>('/users');
            return ApiResponse.success(response);
        } catch (error: unknown) {
            return ApiResponse.error(error)
        }
    }

    static async searchByEmail(email: string): Promise<ApiResponse<UserSearchResult> | ApiResponse<never>> {
        try {
            const response = await protectedApi.get<UserSearchResult>('/users/search', {
                params: {email},
            })
            return ApiResponse.success(response)
        } catch (error: unknown) {
            return ApiResponse.error(error)
        }
    }
}
