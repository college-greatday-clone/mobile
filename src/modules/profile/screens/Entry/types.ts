// React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { TAppRootBottomTabNavigationParams } from '@/modules/app/navigations/BottomTab/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

// Constants
import { EAppBottomTabNavigation } from '@/modules/app/constants/navigation.constant.ts'

// Navigations
import { TAppRootStackNavigationParams } from '@/modules/app/navigations'

export type TProfileScreenProps = CompositeScreenProps<
	BottomTabScreenProps<
		TAppRootBottomTabNavigationParams,
		EAppBottomTabNavigation.PROFILE
	>,
	NativeStackScreenProps<TAppRootStackNavigationParams>
>
