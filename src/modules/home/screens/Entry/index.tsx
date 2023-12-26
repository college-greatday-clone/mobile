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

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Glue Stack
import {
	VStack,
	HStack,
	Box,
	Actionsheet,
	ActionsheetDragIndicatorWrapper,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetItem,
	Image,
	Divider,
	View,
	Text
} from '@gluestack-ui/themed'

// Types
import { THomeScreenProps } from './types'

// React Native Responsive
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen'

// Constants
import { EHomeStackNavigation } from '@/modules/app/constants/navigation.constant'

// Image Crop Picker
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker'

// Assets
import WarningRedImage from '@/assets/images/warning-red.png'

const HomeEntryScreen = memo(() => {
	const navigation = useNavigation<THomeScreenProps['navigation']>()
	const [modalOptions, setModalOptions] = useState({
		isDetailOpen: false
	})

	/**
	 * @description Handle modal options
	 *
	 * @param {string} type
	 * @param {boolean} value
	 *
	 * @return {void} void
	 */
	const handleModal = useCallback(
		(type: keyof typeof modalOptions, value: boolean): void => {
			setModalOptions(prev => ({ ...prev, [type]: value }))
		},
		[]
	)

	/**
	 * @description Handle attend user
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onAttend = useCallback(async (): Promise<void> => {
		try {
			const response = (await ImagePicker.openCamera({
				width: 300,
				height: 400,
				useFrontCamera: true,
				includeBase64: true
			})) as { data: string } & ImageOrVideo

			navigation.navigate(EHomeStackNavigation.ATTEND, {
				base64: response.data
			})
		} catch (err) {
			//
		}
	}, [navigation])

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View h={hp(75)}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 30 }}
					showsVerticalScrollIndicator={false}
				>
					<View paddingHorizontal={20}>
						<View marginBottom={20}>
							<BaseBox>
								<Text
									fontSize={15}
									color='#000'
									fontWeight={'$semibold'}
									marginBottom={7}
								>
									PT.GITS Indonesia
								</Text>

								<VStack alignItems='center' justifyContent='center' space='sm'>
									<Box
										backgroundColor='#D9D9D9'
										borderRadius={'$full'}
										height={60}
										w={60}
									/>
									<HStack alignItems='center' space='xs'>
										<Text
											fontSize={20}
											color='$primary400'
											fontWeight={'$semibold'}
										>
											Hallo,
										</Text>
										<Text fontSize={20} color='#000' fontWeight={'$semibold'}>
											Huda Prasetyo
										</Text>
									</HStack>
									<Box
										backgroundColor='#efefef'
										paddingVertical={5}
										paddingHorizontal={10}
										borderRadius={8}
									>
										<Text fontSize={12} color='#000'>
											Regular Office Hour [08:00 - 17:00]
										</Text>
									</Box>
								</VStack>
							</BaseBox>
						</View>

						<BaseBox>
							<HStack
								alignItems='center'
								justifyContent='center'
								marginBottom={8}
							>
								<Text fontSize={18} color='#000' fontWeight={'$semibold'}>
									Attendance
								</Text>
							</HStack>

							<TouchableOpacity
								onPress={() => {
									handleModal('isDetailOpen', true)
								}}
							>
								<Box
									borderWidth={1}
									borderColor='#ebebeb'
									borderRadius={5}
									marginBottom={10}
								>
									<Box
										backgroundColor='#FE881A33'
										paddingVertical={5}
										paddingHorizontal={10}
										borderBottomWidth={1}
										borderBottomColor={'#ebebeb'}
									>
										<Text fontSize={14} color='#000' fontWeight={'$medium'}>
											Today (25 Nov 2023)
										</Text>
									</Box>

									<View paddingVertical={10}>
										<VStack>
											<HStack alignItems='center'>
												<Box
													w='$1/2'
													alignItems='center'
													justifyContent='flex-end'
													flexDirection='column'
													gap={12}
												>
													<Text fontSize={14} color='#000'>
														Clock in
													</Text>
													<Text
														fontSize={14}
														color='$success400'
														fontWeight={'$semibold'}
													>
														-- : --
													</Text>
													<Text fontSize={14} fontWeight={'$bold'} color='#000'>
														Approved
													</Text>
												</Box>
												<Box
													w='$1/2'
													alignItems='center'
													justifyContent='flex-end'
													flexDirection='column'
													gap={12}
												>
													<Text fontSize={14} color='#000'>
														Clock in
													</Text>
													<Text
														fontSize={14}
														color='$red400'
														fontWeight={'$semibold'}
													>
														-- : --
													</Text>
													<Text fontSize={14} fontWeight={'$bold'} color='#000'>
														Approved
													</Text>
												</Box>
											</HStack>
										</VStack>
									</View>
								</Box>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									handleModal('isDetailOpen', true)
								}}
							>
								<Box borderWidth={1} borderColor='#ebebeb' borderRadius={5}>
									<Box
										backgroundColor='#FE881A33'
										paddingVertical={5}
										paddingHorizontal={10}
										borderBottomWidth={1}
										borderBottomColor={'#ebebeb'}
									>
										<Text fontSize={14} color='#000' fontWeight={'$medium'}>
											Yesterday (24 Nov 2023)
										</Text>
									</Box>

									<View paddingVertical={10}>
										<VStack>
											<HStack alignItems='center'>
												<Box
													w='$1/2'
													alignItems='center'
													justifyContent='flex-end'
													flexDirection='column'
													gap={12}
												>
													<Text fontSize={14} color='#000'>
														Clock in
													</Text>
													<Text
														fontSize={14}
														color='$success400'
														fontWeight={'$semibold'}
													>
														-- : --
													</Text>
													<Text fontSize={14} fontWeight={'$bold'} color='#000'>
														Approved
													</Text>
												</Box>
												<Box
													w='$1/2'
													alignItems='center'
													justifyContent='flex-end'
													flexDirection='column'
													gap={12}
												>
													<Text fontSize={14} color='#000'>
														Clock in
													</Text>
													<Text
														fontSize={14}
														color='$red400'
														fontWeight={'$semibold'}
													>
														-- : --
													</Text>
													<Text fontSize={14} fontWeight={'$bold'} color='#000'>
														Approved
													</Text>
												</Box>
											</HStack>
										</VStack>
									</View>
								</Box>
							</TouchableOpacity>
						</BaseBox>
					</View>
				</ScrollView>
			</View>

			<Actionsheet
				isOpen={modalOptions.isDetailOpen}
				onClose={() => handleModal('isDetailOpen', false)}
				zIndex={999}
			>
				<ActionsheetBackdrop />
				<ActionsheetContent h={hp(65)} zIndex={999}>
					<ActionsheetDragIndicatorWrapper>
						<ActionsheetDragIndicator />
					</ActionsheetDragIndicatorWrapper>
					<ActionsheetItem>
						<VStack space='4xl'>
							<VStack>
								<Text fontSize={16} color='#000' fontWeight={'$semibold'}>
									Huda Prasetyo
								</Text>
								<Text fontSize={14} color='#000' fontWeight={'$normal'}>
									Regular Office Hour [08:00 - 17:00]
								</Text>
							</VStack>

							<VStack space='xs' justifyContent='space-between'>
								<HStack
									space='xs'
									justifyContent='space-between'
									alignItems='center'
								>
									<VStack w='$1/2' space='xs'>
										<Text fontSize={14} color='#000' fontWeight={'$semibold'}>
											Clock In
										</Text>
										<Text fontSize={14} color='#000' fontWeight={'$normal'}>
											24 Nov 2023 08:41:00
										</Text>
										<Text
											fontSize={14}
											color='$success400'
											fontWeight={'$normal'}
										>
											Approved
										</Text>
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
									</VStack>
									<VStack
										alignItems='flex-end'
										justifyContent='flex-end'
										w='$1/2'
										paddingRight={10}
									>
										<Box
											h={60}
											w={60}
											backgroundColor='#D9D9D9'
											borderRadius={8}
										/>
									</VStack>
								</HStack>
							</VStack>

							<Divider />

							<VStack space='sm' justifyContent='space-between'>
								<HStack
									space='xs'
									justifyContent='space-between'
									alignItems='center'
								>
									<VStack w='$1/2' space='xs'>
										<Text fontSize={14} color='#000' fontWeight={'$semibold'}>
											Clock In
										</Text>
										<Text fontSize={14} color='#000' fontWeight={'$normal'}>
											24 Nov 2023 08:41:00
										</Text>
										<Text
											fontSize={14}
											color='$success400'
											fontWeight={'$normal'}
										>
											Approved
										</Text>
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
									</VStack>
									<VStack
										alignItems='flex-end'
										justifyContent='flex-end'
										w='$1/2'
										paddingRight={10}
									>
										<Box
											h={60}
											w={60}
											backgroundColor='#D9D9D9'
											borderRadius={8}
										/>
									</VStack>
								</HStack>

								<VStack space='xs'>
									<Text fontSize={14} fontWeight={'$extrabold'} color='#000'>
										Task Management:
									</Text>
									<Text fontSize={13} color='#000'>
										Setup project baru, memasang authentication dan deploying to
										production server
									</Text>
								</VStack>
							</VStack>
						</VStack>
					</ActionsheetItem>
				</ActionsheetContent>
			</Actionsheet>

			<HStack
				w='$full'
				alignItems='center'
				justifyContent='center'
				position='absolute'
				bottom={0}
				marginBottom={10}
			>
				<BaseButton
					button={{
						width: wp(90),
						backgroundColor: '$primary400',
						rounded: '$lg',
						onPress: onAttend
					}}
				>
					Clock In
				</BaseButton>
			</HStack>
		</SafeAreaView>
	)
})

HomeEntryScreen.displayName = 'HomeEntryScreen'

export { HomeEntryScreen }
