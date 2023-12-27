// Constants
import { EHomeStackNavigation } from '@/modules/app/constants/navigation.constant'

// Types
import { TAttendance } from '@/modules/app/types/app.type'

export type THomeStackNavigationParams = {
	[EHomeStackNavigation.INDEX]: undefined
	[EHomeStackNavigation.ATTEND]: {
		base64: string
		date: string
		attendance: TAttendance | null
	}
}
