// React
import { memo, useCallback, useState, useEffect, useMemo } from 'react'

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
import { useIsFocused, useNavigation } from '@react-navigation/native'

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
import { TAttendance } from '@/modules/app/types/app.type'

// React Native Responsive
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen'

// Constants
import { EHomeStackNavigation } from '@/modules/app/constants/navigation.constant'
import {
	EWorkType,
	EWorkingHour
} from '@/modules/app/constants/common.constant'

// Image Crop Picker
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker'

// Assets
import WarningRedImage from '@/assets/images/warning-red.png'

// Plugins
import { popupError } from '@/plugins/toast'
import { useAppSelector } from '@/plugins/redux'

// Redux
import {
	authGetAuthenticatedUserCompanyName,
	authGetAuthenticatedUserName,
	authGetAuthenticatedUserWorkingHour
} from '@/modules/auth/redux'
import { useLazyAttendance_selfQuery } from '@/modules/app/redux'

// Utils
import {
	renderWorkType,
	renderWorkingHour
} from '@/modules/app/utils/common.util'

// Dayjs
import dayjs from 'dayjs'

const HomeEntryScreen = memo(() => {
	const navigation = useNavigation<THomeScreenProps['navigation']>()
	const [modalOptions, setModalOptions] = useState({
		isDetailOpen: false
	})
	const authenticatedUserCompanyName = useAppSelector(
		authGetAuthenticatedUserCompanyName
	)
	const authenticatedUserName = useAppSelector(authGetAuthenticatedUserName)
	const authenticatedUserWorkingHour = useAppSelector(
		authGetAuthenticatedUserWorkingHour
	)
	const [fetchSelfAttendance, { data: selfAttendance }] =
		useLazyAttendance_selfQuery()
	const attendance = useMemo((): {
		today: TAttendance | null
		yesterday: TAttendance | null
	} => {
		if (selfAttendance) {
			const today =
				selfAttendance.result?.filter(
					attendance =>
						attendance?.createdAt &&
						dayjs(attendance.createdAt).isSame(dayjs(), 'day')
				)?.[0] || null
			const yesterday =
				selfAttendance.result?.filter(
					attendance =>
						attendance?.createdAt &&
						!dayjs(attendance.createdAt).isSame(dayjs(), 'day')
				)?.[0] || null

			return {
				today,
				yesterday
			}
		} else {
			return {
				today: null,
				yesterday: null
			}
		}
	}, [selfAttendance])
	const [currentAttendance, setCurrentAttendance] =
		useState<TAttendance | null>(null)
	const isFocused = useIsFocused()
	const isClockIn = useMemo((): boolean => {
		return !attendance.today?.clockIn
	}, [attendance.today?.clockIn])
	const isFullyAttend = useMemo((): boolean => {
		return (
			typeof attendance.today?.clockIn === 'string' &&
			typeof attendance.today?.clockOut === 'string'
		)
	}, [attendance.today?.clockIn, attendance.today?.clockOut])

	/**
	 * @description Do anything when start to came to this screen
	 *
	 * @return {void} void
	 */
	useEffect(() => {
		fetchSelfAttendance()
	}, [isFocused])

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
				base64: response.data,
				attendance: attendance.today,
				date: dayjs().toDate().toISOString()
			})
		} catch (err) {
			const _err = err as { message?: string }
			popupError(_err?.message || 'Something went wrong when start to attend')
		}
	}, [navigation, attendance.today])

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View h={hp(75)} backgroundColor='#fff'>
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
									{authenticatedUserCompanyName}
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
											Regular Office Hour [
											{renderWorkingHour(
												authenticatedUserWorkingHour as EWorkingHour
											)}
											]
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
									setCurrentAttendance(attendance.today)
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
											Today ({dayjs().format('DD MMM YYYY')})
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
														{attendance.today?.clockIn
															? dayjs(attendance?.today?.clockIn).format(
																	'HH:mm'
																)
															: '-- : --'}
													</Text>
													<Text fontSize={14} fontWeight={'$bold'} color='#000'>
														{
															attendance?.today?.attendanceApprovals?.find(
																attendanceApproval =>
																	attendanceApproval?.type === 'ClockIn'
															)?.status
														}
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
														Clock out
													</Text>
													<Text
														fontSize={14}
														color='$red400'
														fontWeight={'$semibold'}
													>
														{attendance.today?.clockOut
															? dayjs(attendance?.today?.clockOut).format(
																	'HH:mm'
																)
															: '-- : --'}
													</Text>
													<Text fontSize={14} fontWeight={'$bold'} color='#000'>
														{
															attendance?.today?.attendanceApprovals?.find(
																attendanceApproval =>
																	attendanceApproval?.type === 'ClockOut'
															)?.status
														}
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
									setCurrentAttendance(attendance.yesterday)
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
											Yesterday (
											{dayjs().subtract(1, 'day').format('DD MMM YYYY')})
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
														{attendance.yesterday?.clockIn
															? dayjs(attendance?.yesterday?.clockIn).format(
																	'HH:mm'
																)
															: '-- : --'}
													</Text>
													<Text fontSize={14} fontWeight={'$bold'} color='#000'>
														{
															attendance?.yesterday?.attendanceApprovals?.find(
																attendanceApproval =>
																	attendanceApproval?.type === 'ClockIn'
															)?.status
														}
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
														Clock out
													</Text>
													<Text
														fontSize={14}
														color='$red400'
														fontWeight={'$semibold'}
													>
														{attendance.yesterday?.clockOut
															? dayjs(attendance?.yesterday?.clockOut).format(
																	'HH:mm'
																)
															: '-- : --'}
													</Text>
													<Text fontSize={14} fontWeight={'$bold'} color='#000'>
														{
															attendance?.yesterday?.attendanceApprovals?.find(
																attendanceApproval =>
																	attendanceApproval?.type === 'ClockOut'
															)?.status
														}
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
									{authenticatedUserName}
								</Text>
								<Text fontSize={14} color='#000' fontWeight={'$normal'}>
									Regular Office Hour [
									{renderWorkingHour(
										authenticatedUserWorkingHour as EWorkingHour
									)}
									] - {renderWorkType(currentAttendance?.workType as EWorkType)}
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
											{currentAttendance?.clockIn
												? dayjs(currentAttendance?.clockIn).format(
														'DD MMM YYYY HH:mm'
													)
												: '-- : --'}
										</Text>
										<Text
											fontSize={14}
											color='$success400'
											fontWeight={'$normal'}
										>
											{
												currentAttendance?.attendanceApprovals?.find(
													attendanceApproval =>
														attendanceApproval?.type === 'ClockIn'
												)?.status
											}
										</Text>
										{currentAttendance?.isLateClockIn && (
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
										)}
									</VStack>
									<VStack
										alignItems='flex-end'
										justifyContent='flex-end'
										w='$1/2'
										paddingRight={10}
									>
										{currentAttendance?.clockInPhoto ? (
											<Image
												source={{
													uri: `data:image/jpeg;base64,${currentAttendance?.clockInPhoto}`
												}}
												alt='Clock In Photo'
												h={60}
												w={60}
												objectFit='contain'
											/>
										) : (
											<Box
												h={60}
												w={60}
												backgroundColor='#D9D9D9'
												borderRadius={8}
											/>
										)}
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
											Clock Out
										</Text>
										<Text fontSize={14} color='#000' fontWeight={'$normal'}>
											{currentAttendance?.clockOut
												? dayjs(currentAttendance?.clockOut).format(
														'DD MMM YYYY HH:mm'
													)
												: '-- : --'}
										</Text>
										<Text
											fontSize={14}
											color='$success400'
											fontWeight={'$normal'}
										>
											{
												currentAttendance?.attendanceApprovals?.find(
													attendanceApproval =>
														attendanceApproval?.type === 'ClockOut'
												)?.status
											}
										</Text>
										{currentAttendance?.isLateClockOut && (
											<HStack alignItems='center' space='xs'>
												<Image
													source={WarningRedImage}
													width={24}
													height={24}
													alt='Warning Late For Work'
												/>
												<Text fontSize={12} color='$red400'>
													You clock out to quick
												</Text>
											</HStack>
										)}
									</VStack>
									<VStack
										alignItems='flex-end'
										justifyContent='flex-end'
										w='$1/2'
										paddingRight={10}
									>
										{currentAttendance?.clockOutPhoto ? (
											<Image
												source={{
													uri: `data:image/jpeg;base64,${currentAttendance?.clockOutPhoto}`
												}}
												alt='Clock In Photo'
												h={60}
												w={60}
												objectFit='contain'
											/>
										) : (
											<Box
												h={60}
												w={60}
												backgroundColor='#D9D9D9'
												borderRadius={8}
											/>
										)}
									</VStack>
								</HStack>

								{currentAttendance?.clockOutRemark && (
									<VStack space='xs'>
										<Text fontSize={14} fontWeight={'$extrabold'} color='#000'>
											Task Management:
										</Text>
										<Text fontSize={13} color='#000'>
											{currentAttendance?.clockOutRemark}
										</Text>
									</VStack>
								)}
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
						backgroundColor: isFullyAttend ? '#ccc' : '$primary400',
						rounded: '$lg',
						disabled: isFullyAttend,
						onPress: onAttend
					}}
				>
					{isFullyAttend ? 'FullyAttend' : isClockIn ? 'Clock In' : 'Clock Out'}
				</BaseButton>
			</HStack>
		</SafeAreaView>
	)
})

HomeEntryScreen.displayName = 'HomeEntryScreen'

export { HomeEntryScreen }
