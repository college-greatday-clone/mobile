// Interfaces
import {
	IAppSliceHandleCounterAttrs,
	EAppSliceHandleCounterType,
	IAppSliceState
} from './types'

// Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Interfaces
import { IRootState } from '@/plugins/redux/reducer'

const initialState: IAppSliceState = {
	isInitialized: false,
	counter: 0
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		app_HANDLE_COUNTER: (
			state,
			{ payload }: PayloadAction<IAppSliceHandleCounterAttrs>
		): void => {
			if (payload.type === EAppSliceHandleCounterType.INCREASE) {
				state.counter = state.counter += 1
			}

			if (payload.type === EAppSliceHandleCounterType.DECREASE) {
				state.counter = state.counter -= 1
			}
		},
		app_HANDLE_INITIALIZE: (
			state,
			{ payload }: PayloadAction<boolean>
		): void => {
			state.isInitialized = payload
		}
	}
})

// Actions / Mutations
export const { app_HANDLE_COUNTER, app_HANDLE_INITIALIZE } = appSlice.actions

// Getters
export const appGetInitialized = (state: IRootState) => state.app.isInitialized
export const appGetCounter = (state: IRootState) => state.app.counter

export default appSlice.reducer
