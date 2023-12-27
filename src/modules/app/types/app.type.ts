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

export type TAttendanceResponse = IAppResponse<TAttendance[]>
export type TAttendanceAttendAttrs = {
	body: {
		date: string
		photo: string
		remark?: string
	}
}
