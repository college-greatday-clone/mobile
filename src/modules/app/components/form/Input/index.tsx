// React
import { memo, useState, useEffect } from 'react'

// GlueStack
import { Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed'

// React Native
import { Text, View } from 'react-native'

// Types
import { TFormInputProps } from './types'

const FormInput = memo((props: TFormInputProps) => {
	const [isRerender, setIsRerender] = useState(false)

	useEffect(() => {
		setIsRerender(() => true)

		setTimeout(() => {
			setIsRerender(() => false)
		}, 0.1)
	}, [props?.isRerender])

	return (
		<View className='mb-4'>
			<Input
				{...props?.input}
				isInvalid={props?.input?.isInvalid || props?.error !== undefined}
			>
				<InputField {...props?.inputField} />
				{!isRerender && props?.inputSlot && (
					<InputSlot {...props.inputSlot}>
						{props?.inputIcon && <InputIcon {...props.inputIcon} />}
					</InputSlot>
				)}
			</Input>

			{props?.error && (
				<Text className='text-red-500 font-12 mt-2'>
					{props.error?.message}
				</Text>
			)}
		</View>
	)
})

FormInput.displayName = 'FormInput'

export { FormInput }
