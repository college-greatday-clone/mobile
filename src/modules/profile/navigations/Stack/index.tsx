// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// App Screens
import { ProfileScreen } from '@/modules/profile/screens'

// Interfaces
import { TProfileStackNavigationParams } from './types'

// Constants
import { EProfileStackNavigation } from '@/modules/app/constants/navigation.constant'

const Stack = createNativeStackNavigator<TProfileStackNavigationParams>()
const ProfileStackNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName={EProfileStackNavigation.INDEX}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={EProfileStackNavigation.INDEX}
				component={ProfileScreen}
			/>
		</Stack.Navigator>
	)
}

export { ProfileStackNavigation }
