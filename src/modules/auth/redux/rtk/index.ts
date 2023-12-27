// Interfaces
import {
	IAuthAttrsForgotPassword,
	IAuthAttrsLogin,
	IAuthAttrsRefreshToken,
	IAuthAttrsRegister,
	IAuthAttrsVerify
} from '@/modules/auth/types'
import {
	TAuthResponseUser,
	TAuthResponseMe,
	TAuthResponseNull,
	TAuthResponseRegister,
	TAuthResponseToken
} from '@/modules/auth/types/response.type'

// Rtk
import { emptySplitApi } from '@/modules/app/redux'

export const authApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		auth_login: builder.mutation<TAuthResponseToken, IAuthAttrsLogin>({
			query: ({ body }) => ({
				url: '/v1/auth/login',
				method: 'POST',
				body
			})
		}),
		auth_register: builder.mutation<TAuthResponseRegister, IAuthAttrsRegister>({
			query: ({ body }) => ({
				url: '/v1/auth/register',
				method: 'POST',
				body
			})
		}),
		auth_forgotPassword: builder.mutation<
			TAuthResponseUser,
			IAuthAttrsForgotPassword
		>({
			query: ({ body }) => ({
				url: '/v1/auth/forgot-password',
				method: 'POST',
				body
			})
		}),
		auth_refreshToken: builder.mutation<
			TAuthResponseToken,
			IAuthAttrsRefreshToken
		>({
			query: ({ body }) => ({
				url: '/v1/auth/refresh-token',
				method: 'POST',
				body
			})
		}),
		auth_me: builder.query<TAuthResponseMe, void>({
			query: () => ({
				url: '/v1/auth/me'
			}),
			keepUnusedDataFor: 0
		}),
		auth_verify: builder.mutation<TAuthResponseNull, IAuthAttrsVerify>({
			query: ({ params, body }) => ({
				url: `/v1/auth/verify/${params.token}`,
				method: 'POST',
				body
			})
		}),
		auth_logout: builder.mutation<TAuthResponseNull, void>({
			query: () => ({
				url: '/v1/auth/logout',
				method: 'POST'
			})
		})
	}),
	overrideExisting: false
})

export const {
	useAuth_loginMutation,
	useAuth_registerMutation,
	useAuth_forgotPasswordMutation,
	useAuth_refreshTokenMutation,
	useLazyAuth_meQuery,
	useAuth_verifyMutation,
	useAuth_logoutMutation
} = authApi
