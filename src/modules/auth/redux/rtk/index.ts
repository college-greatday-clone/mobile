// Types
import {
	TAuthAuthenticatedUserResponse,
	TAuthLoginAttrs,
	TAuthLoginResponse,
	TAuthRefreshTokenAttrs,
	TAuthRefreshTokenResponse,
	TAuthRegisterCompanyAttrs,
	TAuthRegisterCompanyResponse,
	TAuthCompanyListAttrs,
	TAuthCompanyListResponse
} from '@/modules/auth/types/auth.type'

// Redux
import { emptySplitApi } from '@/modules/app/redux'

export const authApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		auth_login: builder.mutation<TAuthLoginResponse, TAuthLoginAttrs>({
			query: ({ body }) => ({
				url: '/v1/auth/login',
				method: 'POST',
				body
			})
		}),
		auth_register: builder.mutation<
			TAuthRegisterCompanyResponse,
			TAuthRegisterCompanyAttrs
		>({
			query: ({ body }) => ({
				url: '/v1/auth/register',
				method: 'POST',
				body
			})
		}),
		auth_refreshToken: builder.mutation<
			TAuthRefreshTokenResponse,
			TAuthRefreshTokenAttrs
		>({
			query: ({ body }) => ({
				url: '/v1/auth/refresh-token',
				method: 'POST',
				body
			})
		}),
		auth_companyList: builder.query<
			TAuthCompanyListResponse,
			TAuthCompanyListAttrs
		>({
			query: ({ params }) => ({
				url: `/v1/auth/companies`,
				params
			})
		}),
		auth_me: builder.query<TAuthAuthenticatedUserResponse, void>({
			query: () => ({
				url: '/v1/auth/me'
			}),
			keepUnusedDataFor: 0
		})
	}),
	overrideExisting: false
})

export const {
	useAuth_loginMutation,
	useAuth_registerMutation,
	useAuth_refreshTokenMutation,
	useLazyAuth_companyListQuery,
	useLazyAuth_meQuery
} = authApi
