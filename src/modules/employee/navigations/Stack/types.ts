// Constants
import { EEmployeeStackNavigation } from '@/modules/app/constants/navigation.constant'

export type TEmployeeStackNavigationParams = {
	[EEmployeeStackNavigation.INDEX]: undefined
	[EEmployeeStackNavigation.DETAIL]: {
		id: string
	}
}
