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
import { AppRootBottomTabNavigation } from '@/modules/app/navigations/BottomTab'

const Stack = createNativeStackNavigator<TAppRootStackNavigationParams>()
const AppRootStackNavigation = () => {
	// Selector
	const appIsInitialized = useAppSelector(appGetInitialized)

	return (
		<Stack.Navigator
			initialRouteName={
				!appIsInitialized
					? EAppStackNavigation.SPLASH
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

			{/* Check if app is initialized */}
			{appIsInitialized && (
				<>
					<Stack.Screen
						name={EAppStackNavigation.AUTH}
						component={AuthStackNavigation}
					/>
					<Stack.Screen
						name={EAppStackNavigation.ENTRY}
						component={AppRootBottomTabNavigation}
					/>
				</>
			)}
		</Stack.Navigator>
	)
}

export { AppRootStackNavigation }
