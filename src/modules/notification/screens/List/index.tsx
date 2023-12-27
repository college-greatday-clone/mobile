// React
import { memo, useEffect, useState, useCallback } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { ScrollView } from 'react-native'

// Components
import {
	BaseBox,
	BaseGreatDayBanner,
	BaseButton
} from '@/modules/app/components'

// Glue Stack
import { Text, VStack, View, HStack, Box, Image } from '@gluestack-ui/themed'

// React Navigation
import { useIsFocused, useNavigation } from '@react-navigation/native'

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

// Redux
import {
	useAttendance_approveMutation,
	useAttendance_rejectMutation,
	useLazyAttendance_approvalListQuery
} from '@/modules/app/redux'

// Utils
import { renderWorkingHour } from '@/modules/app/utils/common.util'

// Constants
import { EWorkingHour } from '@/modules/app/constants/common.constant'

// Dayjs
import dayjs from 'dayjs'

const NotificationListScreen = memo(() => {
	const navigation = useNavigation<TNotificationListScreenProps['navigation']>()
	const [fetchAttendanceApprovalList, { data: attendanceApprovalList }] =
		useLazyAttendance_approvalListQuery()
	const [approve] = useAttendance_approveMutation()
	const [reject] = useAttendance_rejectMutation()
	const isFocused = useIsFocused()
	const [loading, setLoading] = useState({
		isApproval: false
	})

	/**
	 * @description Do something when user came to this screen
	 *
	 * @return {void} void
	 */
	useEffect(() => {
		fetchAttendanceApprovalList()
	}, [isFocused])

	/**
	 * @description Handle loading
	 *
	 * @param {string} type
	 * @param {boolean} value
	 *
	 * @return {void} void
	 */
	const handleLoading = useCallback(
		(type: keyof typeof loading, value: boolean): void => {
			setLoading(prev => ({ ...prev, [type]: value }))
		},
		[]
	)

	/**
	 * @description Approval handler
	 *
	 * @param {string} type
	 * @param {string} id
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const approvalHandler = useCallback(
		async (type: 'reject' | 'approve', id: string): Promise<void> => {
			try {
				const popupConfirmResponse = await popupConfirm()

				if (popupConfirmResponse) {
					handleLoading('isApproval', true)

					if (type === 'approve')
						await approve({
							params: { id },
							body: { remark: 'Approved!' }
						}).unwrap()
					if (type === 'reject')
						await reject({
							params: { id },
							body: { remark: 'Rejected!' }
						}).unwrap()

					fetchAttendanceApprovalList()
				}
			} catch (err) {
				console.error('err', err)
			} finally {
				handleLoading('isApproval', false)
			}
		},
		[handleLoading, approve, reject, fetchAttendanceApprovalList]
	)

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
						{attendanceApprovalList &&
							attendanceApprovalList.result.map(attendanceApproval => (
								<View
									marginTop={20}
									marginBottom={5}
									key={attendanceApproval.id}
								>
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
																{
																	attendanceApproval.attendance.createdBy.user
																		.name
																}
															</Text>
															<Text
																color='#000'
																fontSize={14}
																fontWeight={'$normal'}
															>
																Employee -{' '}
																{
																	attendanceApproval.attendance.createdBy
																		.position.name
																}
															</Text>
															<Text
																color='#000'
																fontSize={14}
																fontWeight={'$normal'}
															>
																Regular Office Hour [
																{renderWorkingHour(
																	attendanceApproval.attendance.createdBy
																		.workingHour as EWorkingHour
																)}
																]
															</Text>
														</VStack>
														<VStack>
															{(attendanceApproval.type === 'ClockIn' &&
																attendanceApproval.attendance?.clockInPhoto) ||
															(attendanceApproval.type === 'ClockOut' &&
																attendanceApproval.attendance
																	?.clockOutPhoto) ? (
																<Image
																	source={{
																		uri: `data:image/jpeg;base64,${
																			attendanceApproval.attendance[
																				attendanceApproval.type === 'ClockIn'
																					? 'clockInPhoto'
																					: 'clockOutPhoto'
																			]
																		}`
																	}}
																	alt='Clock In Photo'
																	h={60}
																	w={60}
																	objectFit='contain'
																/>
															) : (
																<View
																	backgroundColor='#D9D9D9'
																	w={60}
																	h={60}
																	borderRadius={8}
																/>
															)}
														</VStack>
													</HStack>
												</VStack>

												<HStack w='$full' alignItems='center'>
													<VStack w='$full'>
														<Text
															color='#000'
															fontSize={16}
															fontWeight={'$bold'}
														>
															{attendanceApproval.type === 'ClockIn'
																? 'Clock In'
																: 'Clock Out'}
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
																	{dayjs(
																		attendanceApproval.type === 'ClockIn'
																			? attendanceApproval.attendance.clockIn
																			: attendanceApproval.attendance.clockOut
																	).format('DD MMM YYYY HH:mm')}
																</Text>
															</Box>
															{(attendanceApproval.attendance.isLateClockIn ||
																attendanceApproval.attendance
																	.isLateClockOut) && (
																<Box w='$1/2'>
																	<HStack alignItems='center' space='xs'>
																		<Image
																			source={WarningRedImage}
																			width={24}
																			height={24}
																			alt='Warning Late For Work'
																		/>
																		<Text fontSize={12} color='$red400'>
																			{attendanceApproval.attendance
																				.isLateClockIn && 'Late for work'}

																			{attendanceApproval.attendance
																				.isLateClockIn &&
																				attendanceApproval.attendance
																					.isLateClockOut &&
																				' and '}

																			{attendanceApproval.attendance
																				.isLateClockOut &&
																				'To quick to clock out'}
																		</Text>
																	</HStack>
																</Box>
															)}
														</HStack>
													</VStack>
												</HStack>

												{attendanceApproval.status !== 'Pending' && (
													<HStack w='$full' alignItems='center'>
														<VStack w='$full'>
															<Text
																fontSize={16}
																fontWeight={'$extrabold'}
																color='#000'
															>
																Status
															</Text>
															<Text
																fontSize={14}
																color={
																	attendanceApproval.status === 'Pending'
																		? '$primary400'
																		: attendanceApproval.status === 'Rejected'
																			? '$red400'
																			: '$success400'
																}
																fontWeight={'$bold'}
															>
																{attendanceApproval.status}
															</Text>
															<Text fontSize={14}>
																Remark: {attendanceApproval.remark}
															</Text>
														</VStack>
													</HStack>
												)}

												{attendanceApproval.status === 'Pending' && (
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
																	onPress: () =>
																		approvalHandler(
																			'reject',
																			attendanceApproval.id
																		)
																}}
																buttonText={{
																	color: '$primary400',
																	fontSize: 12
																}}
																isLoading={loading.isApproval}
															>
																Reject
															</BaseButton>
														</Box>
														<Box w='$1/2'>
															<BaseButton
																button={{
																	height: 30,
																	backgroundColor: '$primary400',
																	onPress: () =>
																		approvalHandler(
																			'approve',
																			attendanceApproval.id
																		)
																}}
																buttonText={{
																	color: '#fff',
																	fontSize: 12
																}}
																isLoading={loading.isApproval}
															>
																Approve
															</BaseButton>
														</Box>
													</HStack>
												)}
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
