// Types
import { IAppResponse } from '@/modules/app/types'

// Constants
import {
	EWorkingHour,
	EWorkType
} from '@/modules/app/constants/common.constant'

export type TEmployeeAddForm = {
	name: string
	email: string
	password: string
	workType: string
	workingHour: string
	positionId: string
	isPic?: boolean
	picList: (string | undefined)[]
}

export type TEmployee = {
	id: string
	workType: EWorkType
	workingHour: EWorkingHour
	phoneNumber: string
	address: string
	isPic: boolean
	position: {
		id: string
		name: string
	}
	user: {
		id: string
		name: string
		email: string
	}
	company: {
		id: string
		name: string
	}
	companyUserControls: {
		companyUser: {
			id: string
			position: {
				id: string
				name: string
			}
			user: {
				id: string
				name: string
			}
		}
	}[]
	companyPersonInCharges: {
		companyUserPersonInCharge: {
			id: string
			position: {
				id: string
				name: string
			}
			user: {
				id: string
				name: string
			}
		}
	}[]
}

export type TEmployeePic = {
	id: string
	position: {
		id: string
		name: string
	}
	user: {
		id: string
		name: string
		email: string
	}
	company: {
		id: string
		name: string
		email: string
		code: string
	}
}

export type TEmployeeListResponse = IAppResponse<TEmployee[]>
export type TEmployeePicListResponse = IAppResponse<TEmployeePic[]>
export type TEmployeePositionListResponse = IAppResponse<
	{
		id: string
		name: string
	}[]
>
export type TEmployeeStoreAttrs = {
	body: TEmployeeAddForm
}
export type TEmployeeAssignPicAttrs = {
	params: { id: string }
	body: {
		workType: string
		workingHour: string
		positionId: string
		isPic: boolean
		picList: string[]
	}
}
