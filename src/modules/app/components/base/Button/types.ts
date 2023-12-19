// React
import { ComponentProps, PropsWithChildren } from 'react'

// GlueStack
import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed'

export type TBaseButtonProps = PropsWithChildren<{
	isLoading?: boolean
	button?: ComponentProps<typeof Button>
	buttonText?: ComponentProps<typeof ButtonText>
	buttonIcon?: ComponentProps<typeof ButtonIcon>
}>
