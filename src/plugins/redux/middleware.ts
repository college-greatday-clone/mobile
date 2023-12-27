// Redux Toolkit
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'

// Types
import { IAppResponseError } from '@/modules/app/types/api.type'

// Plugins
import { popupError } from '@/plugins/toast'

const middlewareRenderGenericError = (errorType: string): string => {
	switch (errorType) {
		case 'FETCH_ERROR':
			return 'Internal Server Error'
		case 'TIMEOUT_ERROR':
			return 'Timeout'
		default:
			return ''
	}
}

const middlewareRenderErrorByStatusCode = (status: number): string => {
	switch (status) {
		case 400:
			return 'Bad Request'
		case 422:
			return 'Unprocessable Entity'
		case 500:
			return 'Internal Server Error'
		default:
			return 'Something went wrong from server'
	}
}

/**
 * @description Handle error in server
 *
 * @return {Middleware} Redux Toolkit Middleware
 */
export const middlewareError: Middleware = () => next => (action: any) => {
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
	if (isRejectedWithValue(action)) {
		const _action = action as {
			payload: {
				status: string | number
				data: IAppResponseError
				error?: string
			}
		}

		const {
			payload: { data, error }
		} = _action

		const GENERIC_ERROR = middlewareRenderGenericError(
			_action.payload.status as string
		)

		if (data.errors.length > 0) {
			for (const error of data.errors) {
				popupError(error.message)
			}
		} else {
			popupError(`Error: ${GENERIC_ERROR || error}`)
		}
	}

	// Check for outside error, like request timeout
	if (action?.error?.name === 'AbortError') {
		popupError(`Timeout!`)
	}

	return next(action)
}
