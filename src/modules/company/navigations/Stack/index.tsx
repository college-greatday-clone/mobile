// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// App Screens
import { CompanyRegistrationScreen } from '@/modules/company/screens'

// Interfaces
import { TCompanyStackNavigationParams } from './types'

// Constants
import { ECompanyStackNavigation } from '@/modules/app/constants/navigation.constant'

const Stack = createNativeStackNavigator<TCompanyStackNavigationParams>()
const CompanyStackNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName={ECompanyStackNavigation.INDEX}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={ECompanyStackNavigation.INDEX}
				component={CompanyRegistrationScreen}
			/>
		</Stack.Navigator>
	)
}

export { CompanyStackNavigation }
