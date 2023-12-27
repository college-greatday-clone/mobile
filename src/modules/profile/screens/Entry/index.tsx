// React
import { memo } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// Glue Stack
import { View, Box } from '@gluestack-ui/themed'

// Components
import { BaseGreatDayBanner, BaseButton } from '@/modules/app/components'

// Redux
import { auth_HANDLE_LOGOUT } from '@/modules/auth/redux'

// Plugins
import { useAppDispatch } from '@/plugins/redux'

const ProfileScreen = memo(() => {
	const dispatch = useAppDispatch()

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View paddingHorizontal={20}>
				<Box w='$full'>
					<BaseButton
						button={{
							backgroundColor: '$primary400',
							onPress: () => dispatch(auth_HANDLE_LOGOUT())
						}}
					>
						Logout
					</BaseButton>
				</Box>
			</View>
		</SafeAreaView>
	)
})

ProfileScreen.displayName = 'ProfileScreen'

export { ProfileScreen }
