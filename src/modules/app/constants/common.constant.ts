export enum ERole {
	GreatDayAdmin = 'GreatDayAdmin',
	HRManager = 'HRManager',
	User = 'User',
	Public = 'Public'
}

export enum ECompanyApprovalStatus {
	Pending = 'Pending',
	InProgress = 'InProgress',
	Revise = 'Revise',
	Revised = 'Revised',
	Approved = 'Approved',
	Declined = 'Declined'
}

export enum EAttendanceApprovalStatus {
	Pending = 'Pending',
	Rejected = 'Rejected',
	Approved = 'Approved'
}

export enum EAttendance {
	ClockIn = 'ClockIn',
	ClockOut = 'ClockOut'
}

export enum EWorkType {
	WorkFromHome = 'WorkFromHome',
	WorkFromOffice = 'WorkFromOffice'
}

export enum EWorkingHour {
	EightToFive = 'EightToFive',
	NineToEight = 'NineToEight'
}
