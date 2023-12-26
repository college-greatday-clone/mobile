// React
import { memo } from 'react'

// React Native
import { View } from 'react-native'

// Types
import { TBaseBoxProps } from './types'

const BaseBox = memo(({ children, ...rest }: TBaseBoxProps) => {
	return (
		<View
			className={`rounded-[8px] bg-white pb-4 pt-3 pl-2 pr-4 shadow-md border border-[#ebebeb] ${rest?.className}`}
			{...rest}
		>
			{children}
		</View>
	)
})

BaseBox.displayName = 'BaseBox'

export { BaseBox }
