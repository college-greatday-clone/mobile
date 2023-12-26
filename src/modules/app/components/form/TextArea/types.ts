// React
import { ComponentProps } from 'react'

// React Hook Form
import { FieldError } from 'react-hook-form'

// Glue Stack
import { Textarea, TextareaInput } from '@gluestack-ui/themed'

export type TFormTextAreaProps = {
	textarea?: ComponentProps<typeof Textarea>
	textareaInput?: ComponentProps<typeof TextareaInput>
	error?: FieldError
}
