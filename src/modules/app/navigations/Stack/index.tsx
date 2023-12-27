// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// App Screens
import { AppSplashScreen } from '@/modules/app/screens'

// Interfaces
import { TAppRootStackNavigationParams } from './types'

// Constants
import { EAppStackNavigation } from '@/modules/app/constants/navigation.constant'

// Plugins
import { useAppSelector } from '@/plugins/redux'

// Redux
import { appGetInitialized } from '@/modules/app/redux'
import { authGetIsAuthenticated } from '@/modules/auth/redux'

// Navigations
import { AuthStackNavigation } from '@/modules/auth/navigations'
import { AppRootBottomTabNavigation } from '@/modules/app/navigations/BottomTab'

const Stack = createNativeStackNavigator<TAppRootStackNavigationParams>()
const AppRootStackNavigation = () => {
	const appIsInitialized = useAppSelector(appGetInitialized)
	const isAuthenticated = useAppSelector(authGetIsAuthenticated)

	return (
		<Stack.Navigator
			initialRouteName={
				!appIsInitialized
					? EAppStackNavigation.SPLASH
					: !isAuthenticated
						? EAppStackNavigation.AUTH
						: EAppStackNavigation.ENTRY
			}
			screenOptions={{ headerShown: false }}
		>
			{/* Check if app not initialized */}
			{!appIsInitialized && (
				<Stack.Screen
					name={EAppStackNavigation.SPLASH}
					component={AppSplashScreen}
				/>
			)}

			{/* Check if app is initialized and user not authenticated */}
			{appIsInitialized && !isAuthenticated && (
				<Stack.Screen
					name={EAppStackNavigation.AUTH}
					component={AuthStackNavigation}
				/>
			)}

			{/* Check if app is initialized */}
			{appIsInitialized && isAuthenticated && (
				<Stack.Screen
					name={EAppStackNavigation.ENTRY}
					component={AppRootBottomTabNavigation}
				/>
			)}
		</Stack.Navigator>
	)
}

export { AppRootStackNavigation }
