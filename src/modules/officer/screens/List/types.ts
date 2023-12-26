// React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { TAppRootBottomTabNavigationParams } from '@/modules/app/navigations/BottomTab/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

// Constants
import { EOfficerStackNavigation } from '@/modules/app/constants/navigation.constant.ts'

// Navigations
import { TAppRootStackNavigationParams } from '@/modules/app/navigations'
import { TOfficerStackNavigationParams } from '@/modules/officer/navigations'

export type TOfficerListScreenProps = CompositeScreenProps<
	NativeStackScreenProps<
		TOfficerStackNavigationParams,
		EOfficerStackNavigation.INDEX
	>,
	CompositeScreenProps<
		NativeStackScreenProps<TAppRootStackNavigationParams>,
		BottomTabScreenProps<TAppRootBottomTabNavigationParams>
	>
>
