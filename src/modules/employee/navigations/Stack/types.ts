// Constants
import { EEmployeeStackNavigation } from '@/modules/app/constants/navigation.constant'

// Types
import { TEmployee } from '@/modules/employee/types/employee.type'

export type TEmployeeStackNavigationParams = {
	[EEmployeeStackNavigation.INDEX]: undefined
	[EEmployeeStackNavigation.DETAIL]: TEmployee
}
