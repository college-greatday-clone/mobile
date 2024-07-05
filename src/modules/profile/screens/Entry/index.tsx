// React
import { memo } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// Glue Stack
import { View, Box, Text, VStack, HStack } from '@gluestack-ui/themed'

// Components
import {
	BaseGreatDayBanner,
	BaseButton,
	BaseBox
} from '@/modules/app/components'

// Redux
import {
	auth_HANDLE_LOGOUT,
	authGetAuthenticatedUserCompanyName,
	authGetAuthenticatedUserName,
	authGetAuthenticatedUserWorkingHour
} from '@/modules/auth/redux'

// Plugins
import { useAppDispatch, useAppSelector } from '@/plugins/redux'

// Utils
import { renderWorkingHour } from '@/modules/app/utils/common.util'

// Constants
import { EWorkingHour } from '@/modules/app/constants/common.constant'

const ProfileScreen = memo(() => {
	const dispatch = useAppDispatch()
	const authenticatedUserCompanyName = useAppSelector(
		authGetAuthenticatedUserCompanyName
	)
	const authenticatedUserName = useAppSelector(authGetAuthenticatedUserName)
	const authenticatedUserWorkingHour = useAppSelector(
		authGetAuthenticatedUserWorkingHour
	)

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View paddingHorizontal={20}>
				<View marginBottom={20}>
					<BaseBox>
						<Text
							fontSize={15}
							color='#000'
							fontWeight={'$semibold'}
							marginBottom={7}
						>
							{authenticatedUserCompanyName}
						</Text>

						<VStack alignItems='center' justifyContent='center' space='sm'>
							<Box
								backgroundColor='#D9D9D9'
								borderRadius={'$full'}
								height={60}
								w={60}
							>
								<Box
									height={60}
									display='flex'
									alignItems='center'
									flexDirection='column'
									justifyContent='center'
								>
									<Text fontWeight='$bold' fontSize={24}>
										{authenticatedUserName?.[0]}
									</Text>
								</Box>
							</Box>
							<HStack alignItems='center' space='xs'>
								<Text
									fontSize={20}
									color='$primary400'
									fontWeight={'$semibold'}
								>
									Halo,
								</Text>
								<Text fontSize={20} color='#000' fontWeight={'$semibold'}>
									{authenticatedUserName}
								</Text>
							</HStack>
							<Box
								backgroundColor='#efefef'
								paddingVertical={5}
								paddingHorizontal={10}
								borderRadius={8}
							>
								<Text fontSize={12} color='#000'>
									Jam Kerja{' '}
									{renderWorkingHour(
										authenticatedUserWorkingHour as EWorkingHour
									)}
								</Text>
							</Box>
						</VStack>
					</BaseBox>
				</View>

				<Box w='$full'>
					<BaseButton
						button={{
							backgroundColor: '$primary400',
							onPress: () => dispatch(auth_HANDLE_LOGOUT())
						}}
					>
						Keluar
					</BaseButton>
				</Box>
			</View>
		</SafeAreaView>
	)
})

ProfileScreen.displayName = 'ProfileScreen'

export { ProfileScreen }
