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

// Navigations
import { AuthStackNavigation } from '@/modules/auth/navigations'

const Stack = createNativeStackNavigator<TAppRootStackNavigationParams>()
const AppRootStackNavigation = () => {
	// Selector
	const appIsInitialized = useAppSelector(appGetInitialized)

	return (
		<Stack.Navigator
			initialRouteName={
				!appIsInitialized
					? EAppStackNavigation.SPLASH
					: EAppStackNavigation.AUTH
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

			{/* Check if app is initialized */}
			{appIsInitialized && (
				<>
					<Stack.Screen
						name={EAppStackNavigation.AUTH}
						component={AuthStackNavigation}
					/>
				</>
			)}
		</Stack.Navigator>
	)
}

export { AppRootStackNavigation }
