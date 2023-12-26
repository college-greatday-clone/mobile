// React
import { memo } from 'react'

// Glue Stack
import { Textarea, TextareaInput } from '@gluestack-ui/themed'

// Types
import { TFormTextAreaProps } from './types'

// React Native
import { Text } from 'react-native'

const FormTextArea = memo((props: TFormTextAreaProps) => {
	return (
		<>
			<Textarea
				{...props?.textarea}
				isInvalid={props?.textarea?.isInvalid || props?.error !== undefined}
			>
				<TextareaInput {...props?.textareaInput} />
			</Textarea>
			{props?.error && (
				<Text className='text-red-500 font-12 mt-2'>
					{props?.error?.message}
				</Text>
			)}
		</>
	)
})

FormTextArea.displayName = 'FormTextArea'

export { FormTextArea }
