// Types
import { IAppResponse } from '@/modules/app/types/api.type'

export type TAttendance = {
	id: string
	clockIn: string
	clockOut: string
	isLateClockIn: boolean
	clockInPhoto: string
	isLateClockOut: boolean
	clockOutPhoto: boolean
	clockOutRemark: string | null
	companyUserId: string
	createdAt: string
	userId: string
	attendanceApprovals: {
		id: string
		type: string
		status: string
	}[]
}

export type TAttendanceApproval = {
	id: string
	attendanceId: string
	type: string
	remark: string | null
	status: string
	createdAt: string
	attendance: TAttendance & {
		createdBy: {
			id: string
			workingHour: string
			workType: string
			position: {
				id: string
				name: string
			}
			user: {
				id: string
				name: string
				email: string
				role: string
			}
		}
	}
}

export type TAttendanceResponse = IAppResponse<TAttendance[]>
export type TAttendanceApprovalResponse = IAppResponse<TAttendanceApproval[]>
export type TAttendanceAttendAttrs = {
	body: {
		date: string
		photo: string
		remark?: string
	}
}
export type TAttendanceApprovalAttrs = {
	params: { id: string }
	body: {
		remark: string
	}
}
