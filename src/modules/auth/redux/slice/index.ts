// Types
import { TAuthSliceState } from './types'

// Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Types
import { IRootState } from '@/plugins/redux/reducer'
import { TAuthAuthenticatedUser } from '@/modules/auth/types/auth.type'

const initialState: TAuthSliceState = {
	tokens: {
		token: '',
		refreshToken: ''
	},
	authenticatedUser: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		auth_HANDLE_TOKENS: (
			state,
			{ payload }: PayloadAction<TAuthSliceState['tokens']>
		) => {
			state.tokens = payload
		},
		auth_HANDLE_AUTHENTICATED_USER: (
			state,
			{ payload }: PayloadAction<TAuthAuthenticatedUser>
		) => {
			state.authenticatedUser = payload
		},
		auth_HANDLE_LOGOUT: state => {
			state.tokens = initialState.tokens
			state.authenticatedUser = initialState.authenticatedUser
		}
	}
})

// Actions / Mutations
export const {
	auth_HANDLE_TOKENS,
	auth_HANDLE_AUTHENTICATED_USER,
	auth_HANDLE_LOGOUT
} = authSlice.actions

// Getters
export const authGetIsAuthenticated = (state: IRootState) =>
	state.auth.tokens.token !== '' && state.auth.tokens.refreshToken !== ''
export const authGetToken = (state: IRootState) => state.auth.tokens.token
export const authGetRefreshToken = (state: IRootState) =>
	state.auth.tokens.refreshToken
export const authGetAuthenticatedUserName = (state: IRootState) =>
	state.auth.authenticatedUser?.name || ''
export const authGetAuthenticatedUserRole = (state: IRootState) =>
	state.auth.authenticatedUser?.role
export const authGetAuthenticatedUserIsHumanResource = (state: IRootState) =>
	state.auth.authenticatedUser?.position?.name === 'Human Resource'
export const authGetAuthenticatedUserIsPic = (state: IRootState) =>
	state.auth.authenticatedUser?.isPic
export const authGetAuthenticatedUserCompanyName = (state: IRootState) =>
	state.auth.authenticatedUser?.company?.name
export const authGetAuthenticatedUserWorkingHour = (state: IRootState) =>
	state.auth.authenticatedUser?.workingHour
export const authGetAuthenticatedUserWorkType = (state: IRootState) =>
	state.auth.authenticatedUser?.workType
export const authGetAuthenticatedUserPicList = (state: IRootState) =>
	state.auth.authenticatedUser?.personsInCharge || []
export const authGetAuthenticatedUserPosition = (state: IRootState) =>
	state.auth.authenticatedUser?.position?.name

export default authSlice.reducer
