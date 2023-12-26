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

export type TEmployeeDetailScreenProps = CompositeScreenProps<
	NativeStackScreenProps<
		TEmployeeStackNavigationParams,
		EEmployeeStackNavigation.DETAIL
	>,
	CompositeScreenProps<
		NativeStackScreenProps<TAppRootStackNavigationParams>,
		BottomTabScreenProps<TAppRootBottomTabNavigationParams>
	>
>
