// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// App Screens
import { HomeAttendScreen, HomeEntryScreen } from '@/modules/home/screens'

// Interfaces
import { THomeStackNavigationParams } from './types'

// Constants
import { EHomeStackNavigation } from '@/modules/app/constants/navigation.constant'

const Stack = createNativeStackNavigator<THomeStackNavigationParams>()
const HomeStackNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName={EHomeStackNavigation.INDEX}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={EHomeStackNavigation.INDEX}
				component={HomeEntryScreen}
			/>
			<Stack.Screen
				name={EHomeStackNavigation.ATTEND}
				component={HomeAttendScreen}
			/>
		</Stack.Navigator>
	)
}

export { HomeStackNavigation }
