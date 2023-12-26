// React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { TAppRootBottomTabNavigationParams } from '@/modules/app/navigations/BottomTab/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

// Constants
import { EHomeStackNavigation } from '@/modules/app/constants/navigation.constant.ts'

// Navigations
import { TAppRootStackNavigationParams } from '@/modules/app/navigations'
import { THomeStackNavigationParams } from '@/modules/home/navigations'

export type THomeScreenProps = CompositeScreenProps<
	NativeStackScreenProps<
		THomeStackNavigationParams,
		EHomeStackNavigation.INDEX
	>,
	CompositeScreenProps<
		NativeStackScreenProps<TAppRootStackNavigationParams>,
		BottomTabScreenProps<TAppRootBottomTabNavigationParams>
	>
>
