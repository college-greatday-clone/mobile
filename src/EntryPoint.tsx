// React
import { useEffect } from 'react'

// App Navigation
import { AppRootStackNavigation } from '@/modules/app/navigations'

// Plugins
import { useAppDispatch } from './plugins/redux'

// Redux
import { app_HANDLE_INITIALIZE } from '@/modules/app/redux'

const EntryPoint = (): JSX.Element => {
	// Dispatcher
	const dispatch = useAppDispatch()

	// Handle any async request before opening the app
	useEffect(() => {
		// Note: You have async request in here?
		dispatch(app_HANDLE_INITIALIZE(false))

		setTimeout(() => {
			dispatch(app_HANDLE_INITIALIZE(true))
		}, 3000)
	}, [dispatch])

	return <AppRootStackNavigation />
}

export { EntryPoint }
