// React
import { memo, useCallback } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { View, ScrollView, Text } from 'react-native'

// Components
import {
	BaseBox,
	BaseGreatDayBanner,
	BaseButton
} from '@/modules/app/components'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Glue Stack
import { VStack, HStack, Box } from '@gluestack-ui/themed'

// Types
import { THomeScreenProps } from './types'

// React Native Responsive
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Constants
import { EHomeStackNavigation } from '@/modules/app/constants/navigation.constant'

// React Native Vision Camera
import { useCameraPermission } from 'react-native-vision-camera'

const HomeEntryScreen = memo(() => {
	const navigation = useNavigation<THomeScreenProps['navigation']>()
	const { requestPermission } = useCameraPermission()

	/**
	 * @description Handle attend user
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onAttend = useCallback(async (): Promise<void> => {
		try {
			const response = await requestPermission()
			console.log('response', response)

			if (response) {
				//
			}

			navigation.navigate(EHomeStackNavigation.ATTEND)
		} catch (err) {
			//
		}
	}, [navigation, requestPermission])

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
				<BaseGreatDayBanner />

				<View className='px-4'>
					<BaseBox className='px-4 py-8'>
						<Text className='text-black text-[15px] leading-normal font-semibold mb-8'>
							PT.GITS Indonesia
						</Text>

						<View className='items-center justify-center gap-2'>
							<View
								className='w-[60px] h-[60px] rounded-full bg-[#D9D9D9]'
								aria-label='Dump Photo'
							/>
							<View className='flex flex-row items-center gap-1'>
								<Text className='text-primary text-[20px] leading-normal font-semibold'>
									Hallo,
								</Text>
								<Text className='text-[#000] text-[20px] leading-normal font-semibold'>
									Huda Prasetyo
								</Text>
							</View>
							<View className='bg-[#efefef] p-2 flex flex-row items-center'>
								<Text className='text-[12px] font-normal leading-normal '>
									Regular Office Hour [08:00 - 17:00]
								</Text>
							</View>
						</View>
					</BaseBox>

					<BaseBox className='px-4 pt-4 pb-8 mt-4'>
						<View className='flex flex-row items-center justify-center mb-4'>
							<Text className='text-[#000] text-[18px] leading-normal font-semibold'>
								Attendance
							</Text>
						</View>

						<View className='border border-[#ebebeb] rounded-[5px]'>
							<View className='bg-[#FE881A33] p-3 border-b-[#ebebeb]'>
								<Text className='text-[#000] text-[14px] leading-normal font-medium'>
									Today (25 Nov 2023)
								</Text>
							</View>

							<View className='py-6'>
								<VStack>
									<HStack alignItems='center'>
										<Box
											w='$1/2'
											alignItems='center'
											justifyContent='flex-end'
											flexDirection='column'
											gap={12}
										>
											<Text className='text-[#000] text-[14px] leading-normal font-normal'>
												Clock in
											</Text>
											<Text className='text-success text-[14px] leading-normal font-semibold'>
												-- : --
											</Text>
											<Text className='text-[#000] text-[14px] leading-normal font-bold'>
												Approved
											</Text>
										</Box>
										<Box
											w='$1/2'
											alignItems='center'
											justifyContent='flex-start'
											flexDirection='column'
											gap={12}
										>
											<Text className='text-[#000] text-[14px] leading-normal font-normal'>
												Clock out
											</Text>
											<Text className='text-error text-[14px] leading-normal font-semibold'>
												-- : --
											</Text>
											<Text className='text-[#000] text-[14px] leading-normal font-bold'>
												Approved
											</Text>
										</Box>
									</HStack>
								</VStack>
							</View>
						</View>

						<View className='border border-[#ebebeb] rounded-[5px] mt-6'>
							<View className='bg-[#FE881A33] p-3 border-b-[#ebebeb]'>
								<Text className='text-[#000] text-[14px] leading-normal font-medium'>
									Yesterday (24 Nov 2023)
								</Text>
							</View>

							<View className='py-6'>
								<VStack>
									<HStack alignItems='center'>
										<Box
											w='$1/2'
											alignItems='center'
											justifyContent='flex-end'
											flexDirection='column'
											gap={12}
										>
											<Text className='text-[#000] text-[14px] leading-normal font-normal'>
												Clock in
											</Text>
											<Text className='text-success text-[14px] leading-normal font-semibold'>
												-- : --
											</Text>
											<Text className='text-[#000] text-[14px] leading-normal font-bold'>
												Approved
											</Text>
										</Box>
										<Box
											w='$1/2'
											alignItems='center'
											justifyContent='flex-start'
											flexDirection='column'
											gap={12}
										>
											<Text className='text-[#000] text-[14px] leading-normal font-normal'>
												Clock out
											</Text>
											<Text className='text-error text-[14px] leading-normal font-semibold'>
												-- : --
											</Text>
											<Text className='text-[#000] text-[14px] leading-normal font-bold'>
												Approved
											</Text>
										</Box>
									</HStack>
								</VStack>
							</View>
						</View>
					</BaseBox>
				</View>
			</ScrollView>

			<View className='absolute bottom-0 px-4'>
				<BaseButton
					button={{
						width: wp(90),
						backgroundColor: '$primary400',
						marginBottom: 10,
						rounded: '$lg',
						onPress: onAttend
					}}
				>
					Clock In
				</BaseButton>
			</View>
		</SafeAreaView>
	)
})

HomeEntryScreen.displayName = 'HomeEntryScreen'

export { HomeEntryScreen }
