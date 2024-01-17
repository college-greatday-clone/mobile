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
	authGetAuthenticatedUserName,
	authGetAuthenticatedUserPosition,
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
import { TAttendance, TAttendanceResponse } from '@/modules/app/types/app.type'

// React Native HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf'

// React Native Blob Util
import RNFetchBlob from 'react-native-blob-util'

const ReportEntryScreen = memo(() => {
	const [fetchAttendanceList, { data: attendanceList }] =
		useLazyAttendance_listQuery()
	const isFocused = useIsFocused()
	const authenticatedUserWorkingHour = useAppSelector(
		authGetAuthenticatedUserWorkingHour
	)
	const authenticatedUserName = useAppSelector(authGetAuthenticatedUserName)
	const authenticatedUserPosition = useAppSelector(
		authGetAuthenticatedUserPosition
	)
	const [modalOptions, setModalOptions] = useState({
		isDetailOpen: false
	})
	const [currentAttendance, setCurrentAttendance] =
		useState<TAttendance | null>(null)
	const [reportDate, setReportDate] = useState<string>('')

	/**
	 * @description Do anything when user come down to this screen
	 *
	 * @return {void} void
	 */
	useEffect(() => {
		fetchAttendanceList({
			params: { clockIn: 0 }
		})
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
	 * @description Generate usage metrics
	 *
	 * @param
	 *
	 * @return {Promise<any>} Promise<any>
	 */
	const downloadPdf = useCallback(
		async (list: TAttendanceResponse['result']) => {
			try {
				const fileName = `Attendance-Report-${new Date().getTime()}`
				const options = {
					html: `
      <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Report Comet Chat Data</title>
            </head>
            <body>
							<table style="width: 100%; margin-bottom: 10px;" cellpadding="5">
                <tr>
                  <td
                    style="width: 100%; text-align: center; font-size: 24px; font-weight: bold"
                  >
										Report Attendances
                  </td>
                </tr>
              </table>

              <table style="width: 50%; margin-bottom: 10px;" cellpadding="5" border="1">
                <tr>
                  <td style="style="border-right-style: hidden;">Name</td>
                  <td style="border-left-style: hidden; style="border-right-style: hidden;">:</td>
                  <td style="style="border-left-style: hidden;">${authenticatedUserName}</td>
                </tr>
                <tr>
									<td style="style="border-right-style: hidden;">Position</td>
									<td style="border-left-style: hidden; style="border-right-style: hidden;">:</td>
									<td style="style="border-left-style: hidden;">${authenticatedUserPosition}</td>
                </tr>
              </table>

              <table style="width: 100%; margin-bottom: 10px;" cellpadding="5" border="1">
								<thead>
									<tr>
										<th style="border-left-style: hidden; style="border-right-style: hidden;">No</th>
										<th style="border-left-style: hidden; style="border-right-style: hidden;">Clock In</th>
										<th style="border-left-style: hidden; style="border-right-style: hidden;">Clock Out</th>
									</tr>
								</thead>
								<tbody>
									${list
										.map(
											(attendance, index) => `
											<tr>
												<td style="border-left-style: hidden; style="border-right-style: hidden;">${
													index + 1
												}</td>
												<td style="border-left-style: hidden; style="border-right-style: hidden;">${dayjs(
													attendance.clockIn
												).format('DD MMM YYYY HH:mm')}</td>
												<td style="border-left-style: hidden; style="border-right-style: hidden;">${dayjs(
													attendance.clockIn
												).format('DD MMM YYYY HH:mm')}</td>
											</tr>
										`
										)
										.join('')}
								</tbody>
              </table>
            </body>
          </html>`,
					fileName,
					base64: true,
					directory: 'Download'
				}

				const file = await RNHTMLtoPDF.convert(options)
				const downloadPath = `${RNFetchBlob.fs.dirs.DownloadDir?.split(
					'/Android'
				)?.[0]}/Download/${fileName}.pdf`

				if (file?.base64) {
					await RNFetchBlob.fs.writeFile(downloadPath, file.base64, 'base64')
				}

				// Force open the PDF
				RNFetchBlob.android.actionViewIntent(downloadPath, 'application/pdf')
			} catch (err) {
				return Promise.reject(err)
			}
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
							onChange={value => {
								setReportDate(value)

								if (value === '') {
									fetchAttendanceList({
										params: { clockIn: 0 }
									})
								} else {
									fetchAttendanceList({
										params: { clockIn: value }
									})
								}
							}}
							value={reportDate}
							defaultValue={reportDate}
							placeholder='Select Days'
							emptyItemPlaceholder='No Days Available'
							data={[
								{ label: 'All', value: '' },
								{ label: '7 Days Ago', value: '7' },
								{ label: '30 Days Ago', value: '30' }
							]}
						/>
					</Box>
					<Box w='$1/3'>
						<BaseButton
							button={{
								size: 'sm',
								backgroundColor: '$primary400',
								onPress: () =>
									downloadPdf(attendanceList ? attendanceList.result : [])
							}}
						>
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
															{renderWorkType(attendance.workType as EWorkType)}
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
											Clock In -{' '}
											{renderWorkType(currentAttendance?.workType as EWorkType)}
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
