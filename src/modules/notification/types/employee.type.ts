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
