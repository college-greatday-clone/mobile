// React
import { memo } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// Glue Stack
import { Image } from '@gluestack-ui/themed'

// Assets
import GreatDayLogo from '@/assets/images/great-day-logo.png'

const AppSplashScreen = memo(() => {
	return (
		<SafeAreaView className='flex-1 flex-col items-center justify-center'>
			<Image
				source={GreatDayLogo}
				width={250}
				height={83.88}
				alt='Splash Logo'
			/>
		</SafeAreaView>
	)
})

AppSplashScreen.displayName = 'AppSplashScreen'

export { AppSplashScreen }
