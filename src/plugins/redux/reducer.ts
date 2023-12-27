// React Redux
import { combineReducers } from '@reduxjs/toolkit'

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Redux Persist
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// Reducers / Slices
import appReducer from '@/modules/app/redux/slice'
import authReducer from '@/modules/auth/redux/slice'

// RTK
import { emptySplitApi } from '@/modules/app/redux'

// App reducer
const appPersistConfig = {
	key: 'app',
	storage: AsyncStorage,
	whitelist: ['language']
}
const app = persistReducer(appPersistConfig, appReducer)

// Auth reducer
const auth = persistReducer<ReturnType<typeof authReducer>>(
	{
		key: 'auth',
		storage: AsyncStorage,
		whitelist: ['isAuthenticated', 'tokens', 'authenticatedUser'],
		stateReconciler: autoMergeLevel2
	},
	authReducer
)

const rootReducer = combineReducers({
	app,
	auth,
	[emptySplitApi.reducerPath]: emptySplitApi.reducer
})

export type IRootState = ReturnType<typeof rootReducer>

export default rootReducer
