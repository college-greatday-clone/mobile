// React
import { memo } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { Text } from 'react-native'

const AppSplashScreen = memo(() => {
	return (
		<SafeAreaView className='flex-1 flex-col items-center justify-center'>
			<Text className='text-[14px]'>Splash Screen Here</Text>
		</SafeAreaView>
	)
})

AppSplashScreen.displayName = 'AppSplashScreen'

export { AppSplashScreen }
