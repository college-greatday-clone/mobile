// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// App Screens
import { NotificationListScreen } from '@/modules/notification/screens'

// Interfaces
import { TNotificationStackNavigationParams } from './types'

// Constants
import { ENotificationStackNavigation } from '@/modules/app/constants/navigation.constant'

const Stack = createNativeStackNavigator<TNotificationStackNavigationParams>()
const NotificationStackNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName={ENotificationStackNavigation.INDEX}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={ENotificationStackNavigation.INDEX}
				component={NotificationListScreen}
			/>
		</Stack.Navigator>
	)
}

export { NotificationStackNavigation }
