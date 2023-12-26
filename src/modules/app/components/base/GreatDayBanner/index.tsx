// React
import { memo } from 'react'

// Glue Stack
import { View, Image } from '@gluestack-ui/themed'

// Assets
import GreatDayLogo from '@/assets/images/great-day-logo.png'

const BaseGreatDayBanner = memo(() => {
	return (
		<View justifyContent='center' alignItems='center' marginVertical={25}>
			<Image
				source={GreatDayLogo}
				width={120}
				height={40.262}
				alt='GreatDayCloneLogo'
			/>
		</View>
	)
})

BaseGreatDayBanner.displayName = 'BaseGreatDayBanner'

export { BaseGreatDayBanner }
