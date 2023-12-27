// React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Types
import { TAppRootBottomTabNavigationParams } from './types'

// Navigations
import { CompanyStackNavigation } from '@/modules/company/navigations'
import { EmployeeStackNavigation } from '@/modules/employee/navigations'
import { HomeStackNavigation } from '@/modules/home/navigations'
import { ReportStackNavigation } from '@/modules/report/navigations'
import { OfficerStackNavigation } from '@/modules/officer/navigations'
import { NotificationStackNavigation } from '@/modules/notification/navigations'

// Constants
import { EAppBottomTabNavigation } from '@/modules/app/constants/navigation.constant'

// Glue Stack
import { View, Text } from '@gluestack-ui/themed'

const Tab = createBottomTabNavigator<TAppRootBottomTabNavigationParams>()

const AppRootBottomTabNavigation = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name={EAppBottomTabNavigation.OFFICER}
				component={OfficerStackNavigation}
				options={{
					tabBarIconStyle: { display: 'none' },
					tabBarLabel: ({ focused }) => (
						<View flex={1} justifyContent='center' alignItems='center'>
							<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
								Officer
							</Text>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name={EAppBottomTabNavigation.REPORT}
				component={ReportStackNavigation}
				options={{
					tabBarIconStyle: { display: 'none' },
					tabBarLabel: ({ focused }) => (
						<View flex={1} justifyContent='center' alignItems='center'>
							<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
								Report
							</Text>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name={EAppBottomTabNavigation.COMPANY}
				component={CompanyStackNavigation}
				options={{
					tabBarIconStyle: { display: 'none' },
					tabBarLabel: ({ focused }) => (
						<View flex={1} justifyContent='center' alignItems='center'>
							<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
								Company
							</Text>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name={EAppBottomTabNavigation.EMPLOYEE}
				component={EmployeeStackNavigation}
				options={{
					tabBarIconStyle: { display: 'none' },
					tabBarLabel: ({ focused }) => (
						<View flex={1} justifyContent='center' alignItems='center'>
							<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
								Employee
							</Text>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name={EAppBottomTabNavigation.HOME}
				component={HomeStackNavigation}
				options={{
					tabBarIconStyle: { display: 'none' },
					tabBarLabel: ({ focused }) => (
						<View flex={1} justifyContent='center' alignItems='center'>
							<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
								Home
							</Text>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name={EAppBottomTabNavigation.NOTIFICATION}
				component={NotificationStackNavigation}
				options={{
					tabBarIconStyle: { display: 'none' },
					tabBarLabel: ({ focused }) => (
						<View flex={1} justifyContent='center' alignItems='center'>
							<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
								Notification
							</Text>
						</View>
					)
				}}
			/>
		</Tab.Navigator>
	)
}

AppRootBottomTabNavigation.displayName = 'AppRootBottomTabNavigation'

export { AppRootBottomTabNavigation }
