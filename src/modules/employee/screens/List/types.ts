// React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { TAppRootBottomTabNavigationParams } from '@/modules/app/navigations/BottomTab/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

// Constants
import { EEmployeeStackNavigation } from '@/modules/app/constants/navigation.constant.ts'

// Navigations
import { TAppRootStackNavigationParams } from '@/modules/app/navigations'
import { TEmployeeStackNavigationParams } from '@/modules/employee/navigations'

export type TEmployeeListScreenProps = CompositeScreenProps<
	NativeStackScreenProps<
		TEmployeeStackNavigationParams,
		EEmployeeStackNavigation.INDEX
	>,
	CompositeScreenProps<
		NativeStackScreenProps<TAppRootStackNavigationParams>,
		BottomTabScreenProps<TAppRootBottomTabNavigationParams>
	>
>
