// React
import { memo, useEffect, useState, useCallback } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { ScrollView, TouchableOpacity } from 'react-native'

// Components
import {
	BaseBox,
	BaseGreatDayBanner,
	BaseButton,
	FormSelect
} from '@/modules/app/components'

// Glue Stack
import {
	Text,
	VStack,
	View,
	HStack,
	Box,
	Image,
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicatorWrapper,
	ActionsheetDragIndicator,
	ActionsheetItem,
	Divider
} from '@gluestack-ui/themed'

// React Native Responsive
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

// Assets
import WarningRedImage from '@/assets/images/warning-red.png'

// Redux
import { useLazyAttendance_listQuery } from '@/modules/app/redux'
import {
	authGetAuthenticatedUserWorkType,
	authGetAuthenticatedUserWorkingHour
} from '@/modules/auth/redux'

// React Navigation
import { useIsFocused } from '@react-navigation/native'

// Dayjs
import dayjs from 'dayjs'

// Plugins
import { useAppSelector } from '@/plugins/redux'

// Utils
import {
	renderWorkType,
	renderWorkingHour
} from '@/modules/app/utils/common.util'

// Constants
import {
	EWorkType,
	EWorkingHour
} from '@/modules/app/constants/common.constant'

// Types
import { TAttendance } from '@/modules/app/types/app.type'

const ReportEntryScreen = memo(() => {
	const [fetchAttendanceList, { data: attendanceList }] =
		useLazyAttendance_listQuery()
	const isFocused = useIsFocused()
	const authenticatedUserWorkingHour = useAppSelector(
		authGetAuthenticatedUserWorkingHour
	)
	const authenticatedUserWorkType = useAppSelector(
		authGetAuthenticatedUserWorkType
	)
	const [modalOptions, setModalOptions] = useState({
		isDetailOpen: false
	})
	const [currentAttendance, setCurrentAttendance] =
		useState<TAttendance | null>(null)

	/**
	 * @description Do anything when user come down to this screen
	 *
	 * @return {void} void
	 */
	useEffect(() => {
		fetchAttendanceList()
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

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View paddingHorizontal={20}>
				<HStack w='$full' alignItems='center' justifyContent='space-between'>
					<Box w='$1/3'>
						<FormSelect
							onChange={() => {
								//
							}}
							value={'10-50'}
							placeholder='Select Days'
							emptyItemPlaceholder='No Working Hour Available'
							data={[
								{ label: '10-50', value: '10-50' },
								{ label: '50-100', value: '50-100' },
								{ label: '100-500', value: '100-500' },
								{ label: '500-1000', value: '500-1000' }
							]}
						/>
					</Box>
					<Box w='$1/3'>
						<BaseButton button={{ size: 'sm', backgroundColor: '$primary400' }}>
							Unduh PDF
						</BaseButton>
					</Box>
				</HStack>

				<View h={hp(75)}>
					<ScrollView
						contentContainerStyle={{ paddingBottom: 30 }}
						showsVerticalScrollIndicator={false}
					>
						{attendanceList &&
							attendanceList.result.map(attendance => (
								<TouchableOpacity
									key={attendance.id}
									onPress={() => {
										handleModal('isDetailOpen', true)
										setCurrentAttendance(attendance)
									}}
								>
									<View marginTop={20} marginBottom={5}>
										<VStack space='md'>
											<BaseBox>
												<VStack space='md'>
													<VStack>
														<Text
															color='#000'
															fontSize={14}
															fontWeight={'$bold'}
														>
															{dayjs(attendance.createdAt).format(
																'DD MMM YYYY'
															)}
														</Text>
														<Text
															color='#000'
															fontSize={14}
															fontWeight={'$normal'}
															numberOfLines={1}
														>
															Regular Office Hour [
															{renderWorkingHour(
																authenticatedUserWorkingHour as EWorkingHour
															)}
															] -{' '}
															{renderWorkType(
																authenticatedUserWorkType as EWorkType
															)}
														</Text>
													</VStack>

													<HStack w='$full' alignItems='center'>
														<VStack w='$1/2'>
															<Text
																color='$primary400'
																fontSize={14}
																fontWeight={'$bold'}
															>
																Clock In
															</Text>
															<Text
																color='#000'
																fontSize={14}
																fontWeight={'$bold'}
															>
																{attendance?.clockIn
																	? dayjs(attendance.clockIn).format('HH:mm')
																	: '-- : --'}
															</Text>
														</VStack>
														<VStack
															alignSelf='flex-start'
															justifyContent='flex-start'
														>
															<Text
																color='$primary400'
																fontSize={14}
																fontWeight={'$bold'}
															>
																Clock Out
															</Text>
															<Text
																color='#000'
																fontSize={14}
																fontWeight={'$bold'}
															>
																{attendance?.clockOut
																	? dayjs(attendance.clockOut).format('HH:mm')
																	: '-- : --'}
															</Text>
														</VStack>
													</HStack>

													<VStack space='xs'>
														<Text
															color='$primary400'
															fontSize={14}
															fontWeight={'$bold'}
														>
															Status
														</Text>
														<Text
															fontSize={14}
															color={
																attendance?.attendanceApprovals?.find(
																	attendanceApproval =>
																		attendanceApproval?.type === 'ClockIn'
																)?.status === 'Rejected'
																	? '$red400'
																	: attendance?.attendanceApprovals?.find(
																				attendanceApproval =>
																					attendanceApproval?.type === 'ClockIn'
																		  )?.status === 'Approved'
																		? '$success400'
																		: undefined
															}
														>
															{
																attendance?.attendanceApprovals?.find(
																	attendanceApproval =>
																		attendanceApproval?.type === 'ClockIn'
																)?.status
															}
														</Text>
													</VStack>

													{attendance?.clockOutRemark && (
														<VStack space='xs'>
															<Text
																color='$primary400'
																fontSize={14}
																fontWeight={'$bold'}
															>
																Task Management
															</Text>
															<Text color='#000' fontSize={14}>
																{attendance?.clockOutRemark}
															</Text>
														</VStack>
													)}

													<HStack
														alignItems='center'
														space='xs'
														backgroundColor={'rgba(255, 0, 0, 0.10)'}
														paddingHorizontal={10}
														paddingVertical={5}
														borderRadius={5}
													>
														<Image
															source={WarningRedImage}
															width={24}
															height={24}
															alt='Warning Late For Work'
														/>
														<Text fontSize={12} color='$red400'>
															{attendance?.isLateClockIn &&
																'You are late for work'}
															{attendance?.isLateClockIn &&
																attendance?.isLateClockOut &&
																' and also '}
															{attendance?.isLateClockOut &&
																'You to quick to clock out'}
														</Text>
													</HStack>
												</VStack>
											</BaseBox>
										</VStack>
									</View>
								</TouchableOpacity>
							))}
					</ScrollView>
				</View>
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
											color={
												currentAttendance?.attendanceApprovals?.find(
													attendanceApproval =>
														attendanceApproval?.type === 'ClockIn'
												)?.status === 'Rejected'
													? '$red400'
													: currentAttendance?.attendanceApprovals?.find(
																attendanceApproval =>
																	attendanceApproval?.type === 'ClockIn'
														  )?.status === 'Approved'
														? '$success400'
														: undefined
											}
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
		</SafeAreaView>
	)
})

ReportEntryScreen.displayName = 'ReportEntryScreen'

export { ReportEntryScreen }
