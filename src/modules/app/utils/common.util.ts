// Constants
import {
	EWorkingHour,
	EWorkType
} from '@/modules/app/constants/common.constant'

// DayJS
import dayjs from 'dayjs'

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

export const getToday = () => {
	let today = dayjs().startOf('day')

	return today.toDate()
}
