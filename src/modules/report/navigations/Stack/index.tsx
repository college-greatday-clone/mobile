// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// App Screens
import { ReportEntryScreen } from '@/modules/report/screens'

// Interfaces
import { TReportStackNavigationParams } from './types'

// Constants
import { EReportStackNavigation } from '@/modules/app/constants/navigation.constant'

const Stack = createNativeStackNavigator<TReportStackNavigationParams>()
const ReportStackNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName={EReportStackNavigation.INDEX}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={EReportStackNavigation.INDEX}
				component={ReportEntryScreen}
			/>
		</Stack.Navigator>
	)
}

export { ReportStackNavigation }
