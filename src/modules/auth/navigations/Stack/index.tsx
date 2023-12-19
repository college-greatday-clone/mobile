// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// App Screens
import { AuthLoginScreen } from '@/modules/auth/screens'

// Interfaces
import { TAuthStackNavigationParams } from './types'

// Constants
import { EAuthStackNavigation } from '@/modules/app/constants/navigation.constant'

const Stack = createNativeStackNavigator<TAuthStackNavigationParams>()
const AuthStackNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName={EAuthStackNavigation.AUTH_LOGIN}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={EAuthStackNavigation.AUTH_LOGIN}
				component={AuthLoginScreen}
			/>
		</Stack.Navigator>
	)
}

export { AuthStackNavigation }
