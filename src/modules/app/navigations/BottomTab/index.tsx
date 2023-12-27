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
import { ProfileStackNavigation } from '@/modules/profile/navigations'

// Constants
import { EAppBottomTabNavigation } from '@/modules/app/constants/navigation.constant'

// Glue Stack
import { View, Text } from '@gluestack-ui/themed'

// Plugins
import { useAppSelector } from '@/plugins/redux'

// Redux
import {
	authGetAuthenticatedUserIsHumanResource,
	authGetAuthenticatedUserRole
} from '@/modules/auth/redux'

// Constants
import { ERole } from '@/modules/app/constants/common.constant'

const Tab = createBottomTabNavigator<TAppRootBottomTabNavigationParams>()

const AppRootBottomTabNavigation = () => {
	const authenticatedUserRole = useAppSelector(authGetAuthenticatedUserRole)
	const isHumanResource = useAppSelector(
		authGetAuthenticatedUserIsHumanResource
	)

	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={EAppBottomTabNavigation.HOME}
		>
			{[ERole.User, ERole.HRManager].includes(
				authenticatedUserRole as ERole
			) && (
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
			)}
			{[''].includes(authenticatedUserRole as ERole) && (
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
			)}
			{[ERole.GreatDayAdmin].includes(authenticatedUserRole as ERole) && (
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
			)}
			{(isHumanResource || [''].includes(authenticatedUserRole as ERole)) && (
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
			)}
			{(isHumanResource ||
				[ERole.User, ERole.HRManager].includes(
					authenticatedUserRole as ERole
				)) && (
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
			)}
			{[''].includes(authenticatedUserRole as ERole) && (
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
			)}
			<Tab.Screen
				name={EAppBottomTabNavigation.PROFILE}
				component={ProfileStackNavigation}
				options={{
					tabBarIconStyle: { display: 'none' },
					tabBarLabel: ({ focused }) => (
						<View flex={1} justifyContent='center' alignItems='center'>
							<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
								Profile
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
