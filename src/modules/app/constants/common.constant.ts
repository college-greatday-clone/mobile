export enum ERoleType {
	GreatDayAdmin = 'GreatDayAdmin',
	HRManager = 'HRManager',
	User = 'User',
	Public = 'Public'
}

export enum ECompanyApprovalStatusType {
	Pending = 'Pending',
	InProgress = 'InProgress',
	Revise = 'Revise',
	Revised = 'Revised',
	Approved = 'Approved',
	Declined = 'Declined'
}

export enum EAttendanceApprovalStatusType {
	Pending = 'Pending',
	Rejected = 'Rejected',
	Approved = 'Approved'
}

export enum EAttendanceType {
	ClockIn = 'ClockIn',
	ClockOut = 'ClockOut'
}

export enum EWorkType {
	WorkFromHome = 'WorkFromHome',
	WorkFromOffice = 'WorkFromOffice'
}

export enum EWorkingHourType {
	EightToFive = 'EightToFive',
	NineToEight = 'NineToEight'
}
