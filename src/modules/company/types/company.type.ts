import { IAppResponse } from '@/modules/app/types'

export type TCompany = {
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
	requestor: {
		id: string
		name: string
		email: string
	}
}

export type TCompanyApproval = {
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
	approvalLog: {
		id: string
		status: string
		files: any[]
		remark: string | null
		companyId: string
		createdById: string
		createdAt: string
	}
	companyUser: {
		id: string
		workType: string
		workingHour: string
		phoneNumber: string
		address: string
		isPic: boolean
		positionId: string
		userId: string
		companyId: string
		isActive: boolean
		createdAt: string
		updatedAt: string
	}
}

export type TCompanyApprovalListResponse = IAppResponse<TCompany[]>
export type TCompanyApprovalResponse = IAppResponse<TCompanyApproval>
export type TCompanyApprovalAttrs = {
	params: { id: string }
}
