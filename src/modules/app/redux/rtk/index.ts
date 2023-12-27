// Redux Toolkit
import {
	fetchBaseQuery,
	createApi,
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'

// Env
import { API_BASE } from '@env'

// Plugins
import { IRootState } from '@/plugins/redux/reducer'

// Async Mutex
import { Mutex } from 'async-mutex'

// Types
import { TAuthRefreshTokenResponse } from '@/modules/auth/types/auth.type'

// Reducer
import { auth_HANDLE_TOKENS, auth_HANDLE_LOGOUT } from '@/modules/auth/redux'
import {
	TAttendanceApprovalAttrs,
	TAttendanceApprovalResponse,
	TAttendanceAttendAttrs,
	TAttendanceResponse
} from '../../types/app.type'

// Init Mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
	baseUrl: API_BASE,
	prepareHeaders(headers, { getState }) {
		const rootState = getState() as IRootState

		// Set request for coming from mobile to server
		headers.set('Accept', 'application/json')
		headers.set('Cache-Control', 'no-cache')
		headers.set('Pragma', 'no-cache')
		headers.set('Expires', '0')

		// Handle if you have any header send to the server
		if (rootState.auth.tokens.token) {
			headers.set('Authorization', `Bearer ${rootState.auth.tokens.token}`)
		}

		return headers
	}
})

/* NOTE: Open this if u want to refresh token */
const baseQueryWithReAuth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	// wait until the mutex is available without locking it
	await mutex.waitForUnlock()
	let result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		// checking whether the mutex is locked
		if (!mutex.isLocked()) {
			const release = await mutex.acquire()
			try {
				const refreshResult = (await baseQuery(
					'/auth/refresh-token',
					api,
					extraOptions
				)) as { data: TAuthRefreshTokenResponse }

				if (refreshResult.data) {
					api.dispatch(auth_HANDLE_TOKENS(refreshResult.data?.result))

					// retry the initial query
					result = await baseQuery(args, api, extraOptions)
				} else {
					api.dispatch(auth_HANDLE_LOGOUT())
				}
			} catch (_) {
				api.dispatch(auth_HANDLE_LOGOUT())
			} finally {
				// release must be called once the mutex should be released again.
				release()
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock()
			result = await baseQuery(args, api, extraOptions)
		}
	}

	return result
}

export const emptySplitApi = createApi({
	// If you want to use interceptor
	baseQuery: baseQueryWithReAuth,
	endpoints: builder => ({
		attendance_self: builder.query<TAttendanceResponse, void>({
			query: () => ({
				url: `/v1/attendances/self`
			})
		}),
		attendance_list: builder.query<TAttendanceResponse, void>({
			query: () => ({
				url: '/v1/attendances'
			})
		}),
		attendance_attend: builder.mutation<void, TAttendanceAttendAttrs>({
			query: ({ body }) => ({
				url: `/v1/attendances/attend`,
				method: 'PATCH',
				body
			})
		}),
		attendance_approvalList: builder.query<TAttendanceApprovalResponse, void>({
			query: () => ({
				url: `/v1/attendances/approval`
			})
		}),
		attendance_approve: builder.mutation<void, TAttendanceApprovalAttrs>({
			query: ({ params, body }) => ({
				url: `/v1/attendances/approve/${params.id}`,
				method: 'PATCH',
				body
			})
		}),
		attendance_reject: builder.mutation<void, TAttendanceApprovalAttrs>({
			query: ({ params, body }) => ({
				url: `/v1/attendances/reject/${params.id}`,
				method: 'PATCH',
				body
			})
		})
	})
})

export const {
	useLazyAttendance_selfQuery,
	useLazyAttendance_listQuery,
	useAttendance_attendMutation,
	useLazyAttendance_approvalListQuery,
	useAttendance_approveMutation,
	useAttendance_rejectMutation
} = emptySplitApi
