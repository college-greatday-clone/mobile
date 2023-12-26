// React
import { memo, useMemo } from 'react'

// Glue Stack
import {
	Checkbox,
	CheckboxIndicator,
	CheckboxIcon,
	CheckboxLabel,
	CheckIcon
} from '@gluestack-ui/themed'

// Types
import { TFormCheckboxProps } from './types'

const FormCheckbox = memo(
	({
		checkbox,
		checkboxIndicator,
		checkboxIcon,
		checkboxLabel,
		children,
		error
	}: TFormCheckboxProps) => {
		const isChecked = useMemo(() => {
			return (
				Boolean(checkbox?.value) ||
				checkbox?.isChecked ||
				checkbox?.defaultIsChecked ||
				false
			)
		}, [checkbox?.value, checkbox?.isChecked, checkbox?.defaultIsChecked])

		return (
			<Checkbox
				{...checkbox}
				value={checkbox?.value || 'false'}
				isChecked={isChecked}
				defaultIsChecked={isChecked}
				isInvalid={error !== undefined}
				aria-label='Checkbox Base'
			>
				<CheckboxIndicator
					mr='$2'
					backgroundColor={!isChecked ? undefined : '$primary400'}
					borderColor={!isChecked ? undefined : '$primary400'}
					aria-label='Checkbox Indicator'
					{...checkboxIndicator}
				>
					<CheckboxIcon
						as={CheckIcon}
						{...checkboxIcon}
						aria-label='Checkbox Icon'
					/>
				</CheckboxIndicator>
				<CheckboxLabel {...checkboxLabel} aria-label='Checkbox Label'>
					{children}
				</CheckboxLabel>
			</Checkbox>
		)
	}
)

FormCheckbox.displayName = 'FormCheckbox'

export { FormCheckbox }
