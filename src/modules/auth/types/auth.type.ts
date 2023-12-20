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
