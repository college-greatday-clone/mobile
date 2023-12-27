// Types
import { ERoleType } from '@/modules/app/constants/common.constant'
import { IAppCommonResponse } from '@/modules/app/types'

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

export type TAuthLoginResponse = IAppCommonResponse<{
	token: string
	refreshToken: string
}>

export type TAuthRegisterCompanyResponse = IAppCommonResponse<{
	user: {
		id: string
		name: string
		email: string
		role: ERoleType
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

export type TAuthLoginAttrs = {
	body: TAuthLoginForm
}

export type TAuthRegisterCompanyAttrs = {
	body: TAuthRegisterCompanyForm
}
