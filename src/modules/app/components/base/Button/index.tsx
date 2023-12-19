// React
import { memo } from 'react'

// GlueStack
import {
	Button,
	ButtonIcon,
	ButtonSpinner,
	ButtonText
} from '@gluestack-ui/themed'

// Types
import { TBaseButtonProps } from './types'

const BaseButton = memo((props: TBaseButtonProps) => {
	return (
		<Button
			{...props.button}
			isDisabled={props?.button?.isDisabled || props?.isLoading}
		>
			{props?.isLoading && <ButtonSpinner mr='$1' />}
			<ButtonText {...props.buttonText}>{props?.children}</ButtonText>
			{props?.buttonIcon && <ButtonIcon {...props.buttonIcon} />}
		</Button>
	)
})

BaseButton.displayName = 'BaseButton'

export { BaseButton }
