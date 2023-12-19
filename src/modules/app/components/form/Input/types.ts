// React
import { ComponentProps, PropsWithChildren } from 'react'

// GlueStack
import { Input, InputField, InputSlot, InputIcon } from '@gluestack-ui/themed'

// React Hook Form
import { FieldError } from 'react-hook-form'

export type TFormInputProps = PropsWithChildren<{
	input?: ComponentProps<typeof Input>
	inputField?: ComponentProps<typeof InputField>
	inputSlot?: ComponentProps<typeof InputSlot>
	inputIcon?: ComponentProps<typeof InputIcon>
	error?: FieldError
	isRerender?: boolean
}>
