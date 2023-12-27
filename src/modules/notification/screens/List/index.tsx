// React
import { memo, useCallback, useState } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { ScrollView, TouchableOpacity } from 'react-native'

// Components
import {
	BaseBox,
	BaseGreatDayBanner,
	BaseButton
} from '@/modules/app/components'

// Glue Stack
import { Text, VStack, View, HStack, Box, Image } from '@gluestack-ui/themed'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Types
import { TNotificationListScreenProps } from './types'

// React Native Responsive Screen
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen'

// Assets
import WarningRedImage from '@/assets/images/warning-red.png'

// Plugins
import { popupConfirm } from '@/plugins/toast'

const NotificationListScreen = memo(() => {
	const navigation = useNavigation<TNotificationListScreenProps['navigation']>()

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View paddingHorizontal={20}>
				<Text fontSize={16} color={'#000'} fontWeight={'$extrabold'}>
					Approval Attendance
				</Text>

				<View h={hp(75)}>
					<ScrollView
						contentContainerStyle={{ paddingBottom: 30 }}
						showsVerticalScrollIndicator={false}
					>
						{[...Array(1)].map((res, index) => (
							<View marginTop={20} marginBottom={5}>
								<VStack space='md'>
									<BaseBox>
										<VStack space='md'>
											<VStack>
												<HStack
													w='$full'
													justifyContent='space-between'
													alignItems='center'
												>
													<VStack>
														<Text
															color='#000'
															fontSize={14}
															fontWeight={'$bold'}
														>
															Huda Prasetyo
														</Text>
														<Text
															color='#000'
															fontSize={14}
															fontWeight={'$normal'}
														>
															Employee - Fullstack Developer
														</Text>
														<Text
															color='#000'
															fontSize={14}
															fontWeight={'$normal'}
														>
															Regular Office Hour [08:00 - 17:00]
														</Text>
													</VStack>
													<VStack>
														<View
															backgroundColor='#D9D9D9'
															w={60}
															h={60}
															borderRadius={8}
														/>
													</VStack>
												</HStack>
											</VStack>

											<HStack w='$full' alignItems='center'>
												<VStack w='$full'>
													<Text color='#000' fontSize={16} fontWeight={'$bold'}>
														Clock In
													</Text>
													<HStack
														w='$full'
														alignItems='center'
														justifyContent='space-between'
													>
														<Box w='$1/2'>
															<Text
																color='#000'
																fontSize={12}
																fontWeight={'$bold'}
															>
																24 Nov 2023 07:49:00
															</Text>
														</Box>
														<Box w='$1/2'>
															<HStack alignItems='center' space='xs'>
																<Image
																	source={WarningRedImage}
																	width={24}
																	height={24}
																	alt='Warning Late For Work'
																/>
																<Text fontSize={12} color='$red400'>
																	You are Late for Work
																</Text>
															</HStack>
														</Box>
													</HStack>
												</VStack>
											</HStack>

											<HStack
												w='$full'
												alignItems='center'
												justifyContent='space-between'
												space='sm'
											>
												<Box w='$1/2'>
													<BaseButton
														button={{
															height: 30,
															variant: 'outline',
															borderColor: '$primary400',
															onPress: () => popupConfirm()
														}}
														buttonText={{
															color: '$primary400',
															fontSize: 12
														}}
													>
														Decline
													</BaseButton>
												</Box>
												<Box w='$1/2'>
													<BaseButton
														button={{
															height: 30,
															backgroundColor: '$primary400',
															onPress: () => popupConfirm()
														}}
														buttonText={{
															color: '#fff',
															fontSize: 12
														}}
													>
														Approve
													</BaseButton>
												</Box>
											</HStack>
										</VStack>
									</BaseBox>
								</VStack>
							</View>
						))}
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
	)
})

NotificationListScreen.displayName = 'NotificationListScreen'

export { NotificationListScreen }
