// React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Types
import { TAppRootBottomTabNavigationParams } from './types'

// Navigations
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
	authGetAuthenticatedUserIsPic,
	authGetAuthenticatedUserRole
} from '@/modules/auth/redux'

// Constants
import { ERole } from '@/modules/app/constants/common.constant'

// Lucide React Native
import { Users, ClipboardMinus, Home, Bell, User } from 'lucide-react-native'

const Tab = createBottomTabNavigator<TAppRootBottomTabNavigationParams>()

const AppRootBottomTabNavigation = () => {
	const authenticatedUserRole = useAppSelector(authGetAuthenticatedUserRole)
	const isHumanResource = useAppSelector(
		authGetAuthenticatedUserIsHumanResource
	)
	const authAuthenticatedUserIsPic = useAppSelector(
		authGetAuthenticatedUserIsPic
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
						tabBarIconStyle: { marginTop: 5 },
						tabBarIcon: ({ focused }) => (
							<Users color={focused ? '#FE881A' : '#000'} size={20} />
						),
						tabBarLabel: ({ focused }) => (
							<View flex={1} justifyContent='center' alignItems='center'>
								<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
									PIC
								</Text>
							</View>
						)
					}}
				/>
			)}

			{[ERole.User, ERole.HRManager].includes(
				authenticatedUserRole as ERole
			) && (
				<Tab.Screen
					name={EAppBottomTabNavigation.REPORT}
					component={ReportStackNavigation}
					options={{
						tabBarIconStyle: { marginTop: 5 },
						tabBarIcon: ({ focused }) => (
							<ClipboardMinus color={focused ? '#FE881A' : '#000'} size={20} />
						),
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

			{(isHumanResource ||
				[ERole.User, ERole.HRManager].includes(
					authenticatedUserRole as ERole
				)) && (
				<Tab.Screen
					name={EAppBottomTabNavigation.HOME}
					component={HomeStackNavigation}
					options={{
						tabBarIconStyle: { marginTop: 5 },
						tabBarIcon: ({ focused }) => (
							<Home color={focused ? '#FE881A' : '#000'} size={20} />
						),
						tabBarLabel: ({ focused }) => (
							<View flex={1} justifyContent='center' alignItems='center'>
								<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
									Beranda
								</Text>
							</View>
						)
					}}
				/>
			)}
			{(authAuthenticatedUserIsPic ||
				[''].includes(authenticatedUserRole as ERole)) && (
				<Tab.Screen
					name={EAppBottomTabNavigation.NOTIFICATION}
					component={NotificationStackNavigation}
					options={{
						tabBarIconStyle: { marginTop: 5 },
						tabBarIcon: ({ focused }) => (
							<Bell color={focused ? '#FE881A' : '#000'} size={20} />
						),
						tabBarLabel: ({ focused }) => (
							<View flex={1} justifyContent='center' alignItems='center'>
								<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
									Notifikasi
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
					tabBarIconStyle: { marginTop: 5 },
					tabBarIcon: ({ focused }) => (
						<User color={focused ? '#FE881A' : '#000'} size={20} />
					),
					tabBarLabel: ({ focused }) => (
						<View flex={1} justifyContent='center' alignItems='center'>
							<Text fontSize={12} color={focused ? '$primary400' : '#000'}>
								Profil
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
