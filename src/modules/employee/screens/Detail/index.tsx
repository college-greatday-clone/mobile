// React
import { memo, useCallback, useEffect } from 'react'

// React Native
import {
	ScrollView,
	TouchableOpacity,
	Text,
	View,
	BackHandler
} from 'react-native'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// Components
import { BaseBox, BaseGreatDayBanner } from '@/modules/app/components'

// Glue Stack
import {
	Divider,
	VStack,
	HStack,
	Box,
	ChevronLeftIcon
} from '@gluestack-ui/themed'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Types
import { TEmployeeDetailScreenProps } from './types'

// Constants
import { EEmployeeStackNavigation } from '@/modules/app/constants/navigation.constant'

const EmployeeDetailScreen = memo(() => {
	const navigation = useNavigation<TEmployeeDetailScreenProps['navigation']>()

	/**
	 * @description Override Back Handler
	 *
	 * @return {boolean} boolean
	 */
	const onBackHandler = useCallback((): boolean => {
		navigation.navigate(EEmployeeStackNavigation.INDEX)

		return true
	}, [navigation])

	/**
	 * @description Do anything for back handler
	 *
	 * @return {void} void
	 */
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			onBackHandler
		)

		return () => backHandler.remove()
	}, [onBackHandler])

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
				<BaseGreatDayBanner />

				<View className='px-4'>
					<TouchableOpacity
						className='mb-4 flex flex-row items-center gap-1'
						onPress={() => onBackHandler()}
					>
						<ChevronLeftIcon />
						<Text className='text-[#000] font-bold text-[16px]'>Back</Text>
					</TouchableOpacity>

					<BaseBox className='px-4 py-8'>
						<View className='flex flex-row items-center gap-2'>
							<View
								className='w-[80px] h-[80px] rounded-full bg-[#D9D9D9]'
								aria-label='Dump Photo'
							/>
							<View className='flex flex-col gap-2'>
								<Text className='text-[#000] text-[14px] leading-normal font-semibold'>
									Huda Prasetyo
								</Text>
								<Text className='text-[#000] text-[12px] leading-normal font-light'>
									Employee · PIC
								</Text>
							</View>
						</View>

						<View className='py-8'>
							<Divider />
						</View>

						<View className='flex flex-col gap-2'>
							<VStack>
								<HStack space='xl' alignItems='center'>
									<Box w='$32'>
										<Text className='text-[#000] text-[14px] leading-normal font-semibold'>
											Email
										</Text>
									</Box>
									<Text className='text-[#000] text-[12px] leading-normal font-light'>
										Employee · PIC
									</Text>
								</HStack>
							</VStack>
							<VStack>
								<HStack space='xl' alignItems='center'>
									<Box w='$32'>
										<Text className='text-[#000] text-[14px] leading-normal font-semibold'>
											Work Type
										</Text>
									</Box>
									<Text className='text-[#000] text-[12px] leading-normal font-light'>
										Remote
									</Text>
								</HStack>
							</VStack>
							<VStack>
								<HStack space='xl' alignItems='center'>
									<Box w='$32'>
										<Text className='text-[#000] text-[14px] leading-normal font-semibold'>
											Working Hour
										</Text>
									</Box>
									<Text className='text-[#000] text-[12px] leading-normal font-light'>
										08:00 - 17:00
									</Text>
								</HStack>
							</VStack>
							<VStack>
								<HStack space='xl' alignItems='center'>
									<Box w='$32'>
										<Text className='text-[#000] text-[14px] leading-normal font-semibold'>
											Position
										</Text>
									</Box>
									<Text className='text-[#000] text-[12px] leading-normal font-light'>
										Fullstack Developer
									</Text>
								</HStack>
							</VStack>
							<VStack>
								<HStack space='xl' alignItems='center'>
									<Box w='$32'>
										<Text className='text-[#000] text-[14px] leading-normal font-semibold'>
											PIC
										</Text>
									</Box>
									<Text className='text-[#000] text-[12px] leading-normal font-light'>
										Parlindungan
									</Text>
								</HStack>
							</VStack>
							<VStack>
								<HStack space='xl' alignItems='center'>
									<Box w='$32'>
										<Text className='text-[#000] text-[14px] leading-normal font-semibold'>
											Address
										</Text>
									</Box>
									<Text className='text-[#000] text-[12px] leading-normal font-light'>
										Bandung
									</Text>
								</HStack>
							</VStack>
							<VStack>
								<HStack space='xl' alignItems='center'>
									<Box w='$32'>
										<Text className='text-[#000] text-[14px] leading-normal font-semibold'>
											Phone Number
										</Text>
									</Box>
									<Text className='text-[#000] text-[12px] leading-normal font-light'>
										089-898-434-97
									</Text>
								</HStack>
							</VStack>
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
		</SafeAreaView>
	)
})

EmployeeDetailScreen.displayName = 'EmployeeDetailScreen'

export { EmployeeDetailScreen }
