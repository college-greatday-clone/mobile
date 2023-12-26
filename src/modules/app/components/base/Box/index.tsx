// React
import { memo } from 'react'

// Glue Stack
import { Box } from '@gluestack-ui/themed'

// Types
import { TBaseBoxProps } from './types'

const BaseBox = memo(({ children, ...rest }: TBaseBoxProps) => {
	return (
		<Box
			borderRadius={8}
			backgroundColor={'#fff'}
			padding={20}
			elevation={1}
			borderColor={'#ebebeb'}
			borderWidth={1}
			{...rest}
		>
			{children}
		</Box>
	)
})

BaseBox.displayName = 'BaseBox'

export { BaseBox }
