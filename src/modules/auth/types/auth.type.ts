// Types
import {
	ERole,
	EWorkType,
	EWorkingHour
} from '@/modules/app/constants/common.constant'
import { IAppResponse } from '@/modules/app/types'

export type TAuthLoginForm = {
	email: string
	password: string
	companyId: string
}

export type TAuthRegisterCompanyForm = {
	user: {
		name: string
		email: string
		password: string
	}
	company: {
		name: string
		phoneNumber: string
		capacity: string
		city: string
	}
}

export type TAuthPic = {
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
}

export type TAuthCompanyUser = {
	id: string
	workType: EWorkType
	workingHour: EWorkingHour
	phoneNumber: string
	address: string
	isPic: true
	isActive: boolean
	position: {
		id: string
		name: string
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

export type TAuthAuthenticatedUser = {
	id: string
	name: string
	email: string
	role: ERole
	createdAt: string
	updatedAt: string
	companyUsers: TAuthCompanyUser[]
}

export type TAuthLoginResponse = IAppResponse<{
	token: string
	refreshToken: string
}>

export type TAuthRefreshTokenResponse = IAppResponse<{
	token: string
	refreshToken: string
}>

export type TAuthRegisterCompanyResponse = IAppResponse<{
	user: {
		id: string
		name: string
		email: string
		role: ERole
		createdAt: string
		updatedAt: string
	}
	company: {
		id: string
		name: string
		code: string
		city: string
		email: string
		capacity: string
		phoneNumber: string
		requestorId: string
		status: string
		createdAt: string
		updatedAt: string
	}
	companyApproval: {
		id: string
		status: string
		files: any
		remark: null
		companyId: string
		createdById: string
		createdAt: string
	}
}>

export type TAuthAuthenticatedUserResponse =
	IAppResponse<TAuthAuthenticatedUser>

export type TAuthCompanyListResponse = IAppResponse<
	{
		id: string
		name: string
		code: string
	}[]
>

export type TAuthLoginAttrs = {
	body: TAuthLoginForm
}

export type TAuthRegisterCompanyAttrs = {
	body: TAuthRegisterCompanyForm
}

export type TAuthRefreshTokenAttrs = {
	body: { refreshToken: string }
}

export type TAuthCompanyListAttrs = {
	params: { email: string }
}
