// React
import { memo } from 'react'

// GlueStack
import {
	Select,
	SelectTrigger,
	SelectInput,
	SelectIcon,
	SelectPortal,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicatorWrapper,
	SelectDragIndicator,
	SelectItem,
	Icon,
	ChevronDownIcon
} from '@gluestack-ui/themed'

// Types
import { TFormSelectProps } from './types'

// React Native
import { Text } from 'react-native'

const FormSelect = memo(
	({
		onChange,
		data,
		value,
		placeholder,
		emptyItemPlaceholder,
		error,
		variant
	}: TFormSelectProps) => {
		return (
			<>
				<Select
					onValueChange={onChange}
					selectedValue={value}
					isInvalid={error !== undefined}
				>
					<SelectTrigger variant={variant || 'underlined'} size='md'>
						<SelectInput placeholder={placeholder || 'Select Option'} />
						<SelectIcon>
							<Icon as={ChevronDownIcon} />
						</SelectIcon>
					</SelectTrigger>
					<SelectPortal>
						<SelectBackdrop />
						<SelectContent>
							<SelectDragIndicatorWrapper>
								<SelectDragIndicator />
							</SelectDragIndicatorWrapper>
							{data.length === 0 && (
								<SelectItem
									label={emptyItemPlaceholder || 'No Option'}
									value={''}
									isDisabled
								/>
							)}
							{data.map(item => (
								<SelectItem
									label={item.label}
									value={item.value}
									key={item.value}
								/>
							))}
						</SelectContent>
					</SelectPortal>
				</Select>

				{error && (
					<Text className='text-red-500 font-12 mt-2'>{error?.message}</Text>
				)}
			</>
		)
	}
)

FormSelect.displayName = 'FormSelect'

export { FormSelect }
