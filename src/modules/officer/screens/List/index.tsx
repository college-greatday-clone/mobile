// React
import { memo } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { ScrollView } from 'react-native'

// Glue Stack
import { View, Box, Text, HStack, VStack } from '@gluestack-ui/themed'

// Components
import { BaseGreatDayBanner, BaseBox } from '@/modules/app/components'

// React Native Responsive
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

// Plugins
import { useAppSelector } from '@/plugins/redux'

// Redux
import { authGetAuthenticatedUserPicList } from '@/modules/auth/redux'

const OfficerListScreen = memo(() => {
	const authenticatedUserPicList = useAppSelector(
		authGetAuthenticatedUserPicList
	)

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View style={{ height: hp(75) }}>
				<ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
					<View paddingHorizontal={20}>
						<Text
							color='#000'
							fontWeight={'$extrabold'}
							fontSize={16}
							marginBottom={10}
						>
							Your Projects Officers
						</Text>

						{authenticatedUserPicList.map(pic => (
							<View marginBottom={10} key={pic.companyUserPersonInCharge.id}>
								<BaseBox>
									<HStack space='md' alignItems='center'>
										<Box
											w={40}
											h={40}
											borderRadius={'$full'}
											backgroundColor={'#D9D9D9'}
										/>
										<VStack>
											<Text fontSize={14} color='#000' fontWeight={'$semibold'}>
												{pic.companyUserPersonInCharge.user.name}
											</Text>
											<Text fontSize={13} fontWeight={'$light'} color='#000'>
												Employee · {pic.companyUserPersonInCharge.position.name}
											</Text>
										</VStack>
									</HStack>
								</BaseBox>
							</View>
						))}
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
})

OfficerListScreen.displayName = 'OfficerListScreen'

export { OfficerListScreen }
