// Constants
import {
	EWorkingHour,
	EWorkType
} from '@/modules/app/constants/common.constant'

export const renderWorkingHour = (workingHour: EWorkingHour): string => {
	switch (workingHour) {
		case EWorkingHour.EightToFive:
			return '08:00 - 17:00'
		case EWorkingHour.NineToEight:
			return '09:00 - 18:00'
		default:
			return ''
	}
}

export const renderWorkType = (workType: EWorkType): string => {
	switch (workType) {
		case EWorkType.WorkFromHome:
			return 'Work From Home (WFH)'
		case EWorkType.WorkFromOffice:
			return 'Work From Office (WFO)'
		default:
			return ''
	}
}
