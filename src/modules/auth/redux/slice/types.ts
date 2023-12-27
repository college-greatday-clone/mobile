// Types
import { TAuthAuthenticatedUser } from '@/modules/auth/types/auth.type'

export type TAuthSliceState = {
	tokens: {
		token: string
		refreshToken: string
	}
	authenticatedUser: TAuthAuthenticatedUser | null
}
