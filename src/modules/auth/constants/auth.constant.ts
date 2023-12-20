// Types
import {
	TAuthLoginForm,
	TAuthRegisterCompanyForm
} from '@/modules/auth/types/auth.type'

export const AUTH_LOGIN_FORM: TAuthLoginForm = {
	email: '',
	password: '',
	companyId: ''
}

export const AUTH_REGISTER_COMPANY_FORM: TAuthRegisterCompanyForm = {
	user: {
		name: '',
		email: '',
		password: ''
	},
	company: {
		name: '',
		phoneNumber: '',
		capacity: '',
		city: ''
	}
}
