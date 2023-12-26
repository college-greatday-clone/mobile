// React
import { ComponentProps, PropsWithChildren } from 'react'

// Glue Stack
import {
	Checkbox,
	CheckboxIndicator,
	CheckboxIcon,
	CheckboxLabel
} from '@gluestack-ui/themed'

// React Hook Form
import { FieldError } from 'react-hook-form'

export type TFormCheckboxProps = PropsWithChildren<{
	checkbox?: ComponentProps<typeof Checkbox>
	checkboxIndicator?: ComponentProps<typeof CheckboxIndicator>
	checkboxIcon?: ComponentProps<typeof CheckboxIcon>
	checkboxLabel?: ComponentProps<typeof CheckboxLabel>
	error?: FieldError
}>
