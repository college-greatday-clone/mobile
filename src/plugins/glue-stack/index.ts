// Glue Stack
import { createConfig } from '@gluestack-ui/themed'
import { config as defaultConfig } from '@gluestack-ui/config'

const config = createConfig({
	...defaultConfig,
	tokens: {
		...defaultConfig.tokens,
		fontSizes: {
			...defaultConfig.tokens.fontSizes
		},
		colors: {
			...defaultConfig.tokens.colors,
			primary400: '#FE881A',
			primary300: 'rgba(254, 136, 26, 0.3)',
			greatDayBlack: '#192928',
			red400: '#FF0000',
			success400: '#41B55A'
		}
	}
})

export { config }
