// React Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

// Types
import { TAuthStackNavigationParams } from '@/modules/auth/navigations'
import { EAuthStackNavigation } from '@/modules/app/constants/navigation.constant.ts'

export type TAuthRegisterCompanyScreenProps = NativeStackNavigationProp<
	TAuthStackNavigationParams,
	EAuthStackNavigation.AUTH_REGISTER_COMPANY
>
