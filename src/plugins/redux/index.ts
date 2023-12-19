// Redux Toolkit
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// React Redux
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

// Redux Persist
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Reducers / Slices
import rootReducer, { IRootState } from './reducer'

// package.json
import { name as appName } from '../../../package.json'

// App Features
import { emptySplitApi } from '@/modules/app/redux'

// Persist Config
const persistConfig = {
	key: appName,
	storage: AsyncStorage
}

// Make store persist
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Listener Middleware
export const listenerMiddleware = createListenerMiddleware()

// Root Store
const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		const middlewares = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
			.prepend(listenerMiddleware.middleware)
			.concat(emptySplitApi.middleware)

		// Flipper debugger (for development purpose only)
		if (__DEV__) {
			// eslint-disable-next-line
			const createDebugger = require('redux-flipper').default
			middlewares.push(createDebugger())
		}

		return middlewares
	}
})

// Setup listeners to make use of feature inside RTK
setupListeners(store.dispatch)

// Store that persisted
const persistor = persistStore(store)

export type IAppDispatch = typeof store.dispatch
export const useAppDispatch: () => IAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export { store, persistor }
