// React
import { useEffect } from 'react'

// App Navigation
import { AppRootStackNavigation } from '@/modules/app/navigations'

// Plugins
import { useAppDispatch, useAppSelector } from './plugins/redux'

// Redux
import { app_HANDLE_INITIALIZE } from '@/modules/app/redux'
import {
	authGetIsAuthenticated,
	auth_HANDLE_AUTHENTICATED_USER,
	useLazyAuth_meQuery
} from '@/modules/auth/redux'

const EntryPoint = (): JSX.Element => {
	const dispatch = useAppDispatch()
	const isAuthenticated = useAppSelector(authGetIsAuthenticated)
	const [getAuthenticatedUser] = useLazyAuth_meQuery()

	// Handle any async request before opening the app
	useEffect(() => {
		;(async () => {
			// Note: You have async request in here?
			dispatch(app_HANDLE_INITIALIZE(false))

			if (isAuthenticated) {
				const authenticatedUserResponse = await getAuthenticatedUser().unwrap()
				dispatch(
					auth_HANDLE_AUTHENTICATED_USER(authenticatedUserResponse.result)
				)
			}

			setTimeout(() => {
				dispatch(app_HANDLE_INITIALIZE(true))
			}, 3000)
		})()
	}, [dispatch])

	return <AppRootStackNavigation />
}

export { EntryPoint }
