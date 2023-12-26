// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// App Screens
import {
	EmployeeListScreen,
	EmployeeDetailScreen
} from '@/modules/employee/screens'

// Interfaces
import { TEmployeeStackNavigationParams } from './types'

// Constants
import { EEmployeeStackNavigation } from '@/modules/app/constants/navigation.constant'

const Stack = createNativeStackNavigator<TEmployeeStackNavigationParams>()
const EmployeeStackNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName={EEmployeeStackNavigation.INDEX}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={EEmployeeStackNavigation.INDEX}
				component={EmployeeListScreen}
			/>
			<Stack.Screen
				name={EEmployeeStackNavigation.DETAIL}
				component={EmployeeDetailScreen}
			/>
		</Stack.Navigator>
	)
}

export { EmployeeStackNavigation }
