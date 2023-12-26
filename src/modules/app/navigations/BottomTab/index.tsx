// React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Types
import { TAppRootBottomTabNavigationParams } from './types'

// Navigations
import { CompanyStackNavigation } from '@/modules/company/navigations'
import { EmployeeStackNavigation } from '@/modules/employee/navigations'
import { HomeStackNavigation } from '@/modules/home/navigations'
import { ReportStackNavigation } from '@/modules/report/navigations'

// Constants
import { EAppBottomTabNavigation } from '@/modules/app/constants/navigation.constant'

const Tab = createBottomTabNavigator<TAppRootBottomTabNavigationParams>()

const AppRootBottomTabNavigation = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name={EAppBottomTabNavigation.REPORT}
				component={ReportStackNavigation}
			/>
			<Tab.Screen
				name={EAppBottomTabNavigation.COMPANY}
				component={CompanyStackNavigation}
			/>
			<Tab.Screen
				name={EAppBottomTabNavigation.EMPLOYEE}
				component={EmployeeStackNavigation}
			/>
			<Tab.Screen
				name={EAppBottomTabNavigation.HOME}
				component={HomeStackNavigation}
			/>
		</Tab.Navigator>
	)
}

AppRootBottomTabNavigation.displayName = 'AppRootBottomTabNavigation'

export { AppRootBottomTabNavigation }
