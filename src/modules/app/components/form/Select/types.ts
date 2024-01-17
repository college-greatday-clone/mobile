// React Hook Form
import { FieldError } from 'react-hook-form'

export type TFormSelectProps = {
	onChange: (value: string) => void
	data: { label: string; value: string }[]
	value: string
	defaultValue?: string
	placeholder?: string
	emptyItemPlaceholder?: string
	error?: FieldError
	variant?: string
}
