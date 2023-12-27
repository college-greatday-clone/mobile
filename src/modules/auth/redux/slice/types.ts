// Types
import { IAuth } from '@/modules/auth/types/auth.type'

export interface IAuthSliceState {
	isAuthenticated: boolean
	tokens: {
		token: string
		refreshToken: string
	}
	authenticatedUser: IAuth | null
}
