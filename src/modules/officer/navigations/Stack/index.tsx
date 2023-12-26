// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// App Screens
import { OfficerListScreen } from '@/modules/officer/screens'

// Interfaces
import { TOfficerStackNavigationParams } from './types'

// Constants
import { EOfficerStackNavigation } from '@/modules/app/constants/navigation.constant'

const Stack = createNativeStackNavigator<TOfficerStackNavigationParams>()
const OfficerStackNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName={EOfficerStackNavigation.INDEX}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={EOfficerStackNavigation.INDEX}
				component={OfficerListScreen}
			/>
		</Stack.Navigator>
	)
}

export { OfficerStackNavigation }
