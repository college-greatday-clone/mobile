// React
import { memo, useCallback, useState, useMemo } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// Components
import { BaseButton, FormSelect, FormTextArea } from '@/modules/app/components'

// React Navigation
import { useNavigation, useRoute } from '@react-navigation/native'

// React Native
import { TouchableOpacity, ScrollView } from 'react-native'

// Glue Stack
import {
	VStack,
	View,
	Text,
	Image,
	ChevronLeftIcon,
	Icon,
	HStack
} from '@gluestack-ui/themed'

// Types
import { THomeAttendScreenProps } from './types'
import { THomeAttendForm } from '@/modules/home/types/home.type'

// React Native Responsive
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Assets
import CameraWhiteImage from '@/assets/images/camera-white.png'
import WarningRedImage from '@/assets/images/warning-red.png'

// Constants
import { EHomeStackNavigation } from '@/modules/app/constants/navigation.constant'
import {
	EWorkType,
	EWorkingHour
} from '@/modules/app/constants/common.constant'

// Plugins
import { popupConfirm } from '@/plugins/toast'

// React Hook Form
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { HOME_ATTEND_FORM } from '@/modules/home/constants/home.constant'

// Redux
import { useAttendance_attendMutation } from '@/modules/app/redux'
import {
	authGetAuthenticatedUserName,
	authGetAuthenticatedUserPosition,
	authGetAuthenticatedUserWorkType,
	authGetAuthenticatedUserWorkingHour
} from '@/modules/auth/redux'

// DayJS
import dayjs from 'dayjs'

// Plugins
import { useAppSelector } from '@/plugins/redux'

const eightAm = dayjs().set('hour', 8).set('minute', 0).set('second', 0)
const nineAm = dayjs().set('hour', 9).set('minute', 0).set('second', 0)
const fivePm = dayjs().set('hour', 17).set('minute', 0).set('second', 0)
const sixPm = dayjs().set('hour', 18).set('minute', 0).set('second', 0)

const HomeAttendScreen = memo(() => {
	const authenticatedUserWorkType = useAppSelector(
		authGetAuthenticatedUserWorkType
	)
	const navigation = useNavigation<THomeAttendScreenProps['navigation']>()
	const route = useRoute<THomeAttendScreenProps['route']>()
	const formMethods = useForm<THomeAttendForm>({
		defaultValues: { ...HOME_ATTEND_FORM, workType: authenticatedUserWorkType },
		mode: 'all'
	})
	const [attend] = useAttendance_attendMutation()
	const [loading, setLoading] = useState({
		isAttend: false
	})
	const authenticatedUserName = useAppSelector(authGetAuthenticatedUserName)
	const authenticatedUserPosition = useAppSelector(
		authGetAuthenticatedUserPosition
	)
	const authenticatedUserWorkingHour = useAppSelector(
		authGetAuthenticatedUserWorkingHour
	)
	const isClockIn = useMemo((): boolean => {
		return !route.params.attendance?.clockIn
	}, [route.params.attendance?.clockIn])
	const isLate = useMemo((): boolean => {
		if (isClockIn) {
			if (authenticatedUserWorkingHour === EWorkingHour.EightToFive) {
				return dayjs().isAfter(eightAm)
			}

			if (authenticatedUserWorkingHour === EWorkingHour.NineToEight) {
				return dayjs().isAfter(nineAm)
			}
		}

		if (!isClockIn) {
			if (authenticatedUserWorkingHour === EWorkingHour.EightToFive) {
				return dayjs().isBefore(fivePm)
			}

			if (authenticatedUserWorkingHour === EWorkingHour.NineToEight) {
				return dayjs().isBefore(sixPm)
			}
		}

		return false
	}, [authenticatedUserWorkingHour, isClockIn])

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
	 * @description Save attendance
	 *
	 * @param {THomeAttendForm} form
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onSaveAttendance = useCallback(
		async (form?: THomeAttendForm): Promise<void> => {
			const response = await popupConfirm()
			if (response) {
				try {
					handleLoading('isAttend', true)

					await attend({
						body: {
							photo: route.params.base64,
							date: route.params.date,
							remark: form?.remark,
							workType: form?.workType
						}
					}).unwrap()

					navigation.navigate(EHomeStackNavigation.INDEX)
				} catch (err) {
					console.error('err', err)
				} finally {
					handleLoading('isAttend', false)
				}
			}
		},
		[handleLoading, navigation, route.params.base64, route.params.date]
	)

	return (
		<FormProvider {...formMethods}>
			<SafeAreaView className='flex-1 bg-white'>
				<ScrollView>
					<HStack
						width={wp(100)}
						alignItems='center'
						flexDirection='row'
						backgroundColor='$primary400'
						height={50}
						space='xs'
					>
						<TouchableOpacity
							onPress={() => navigation.navigate(EHomeStackNavigation.INDEX)}
							className='flex flex-row items-center'
						>
							<Icon as={ChevronLeftIcon} color='#fff' size='xl' />
							<Text fontSize={18} fontWeight={'$medium'} color='#fff'>
								{isClockIn ? 'Clock In' : 'Clock Out'}
							</Text>
						</TouchableOpacity>
					</HStack>

					<VStack
						justifyContent='center'
						alignItems='center'
						marginTop={20}
						space={'sm'}
					>
						<Text
							fontSize={18}
							lineHeight={'$md'}
							color={'$black'}
							fontWeight={'$bold'}
						>
							{authenticatedUserName}
						</Text>
						<Text
							fontSize={15}
							lineHeight={'$md'}
							color={'$black'}
							fontWeight={'$thin'}
						>
							{authenticatedUserPosition}
						</Text>
					</VStack>

					<VStack
						justifyContent='center'
						alignItems='center'
						marginTop={20}
						space={'sm'}
					>
						<Text fontSize={13} lineHeight={'$md'} color={'$black'}>
							{dayjs().format('DD MMM YYYY')}
						</Text>
						<Text
							fontSize={24}
							lineHeight={'$md'}
							color={'$primary400'}
							fontWeight={'$bold'}
						>
							{dayjs(route.params.date).format('HH:mm')}
						</Text>
						{isLate && (
							<HStack alignItems='center' space='xs'>
								<Image
									source={WarningRedImage}
									width={24}
									height={24}
									alt='Warning Late For Work'
								/>
								<Text fontSize={12} color='$red400'>
									{isClockIn
										? 'You are Late for Work'
										: 'You to quick to clock out'}
								</Text>
							</HStack>
						)}

						<View width={'$1/2'} display={isClockIn ? 'flex' : 'none'}>
							<Controller
								rules={{ required: isClockIn }}
								control={formMethods.control}
								name='workType'
								render={({
									field: { onChange, value },
									fieldState: { error }
								}) => (
									<FormSelect
										placeholder='Select Work Type'
										value={value as EWorkType}
										onChange={onChange}
										emptyItemPlaceholder='No Work Type Registered'
										data={Object.keys(EWorkType).map(workType => ({
											label: workType,
											value: workType
										}))}
										error={error}
									/>
								)}
							/>
						</View>
					</VStack>

					<VStack justifyContent='center' alignItems='center' marginTop={20}>
						<View
							width={wp(40)}
							height={180}
							backgroundColor='#D9D9D9'
							borderRadius='$md'
							alignItems='center'
							justifyContent='center'
						>
							<Image
								source={
									route.params.base64
										? { uri: `data:image/jpeg;base64,${route.params.base64}` }
										: CameraWhiteImage
								}
								width={wp(40)}
								height={180}
								objectFit='contain'
								alt='Camera Attendance'
							/>
						</View>
					</VStack>

					<VStack
						justifyContent='center'
						alignItems='center'
						marginTop={20}
						space='sm'
						display={!isClockIn ? 'flex' : 'none'}
					>
						<Text fontSize={13} fontWeight={'$semibold'}>
							Task Management
						</Text>
						<View width={wp(80)}>
							<Controller
								rules={{ required: !isClockIn ? 'Remark is required' : false }}
								control={formMethods.control}
								name='remark'
								render={({
									field: { onChange, value },
									fieldState: { error }
								}) => (
									<FormTextArea
										textareaInput={{
											onChangeText: onChange,
											value,
											fontSize: 11
										}}
										error={error}
									/>
								)}
							/>
						</View>
					</VStack>
				</ScrollView>

				<View
					position='absolute'
					bottom={0}
					justifyContent='center'
					alignItems='center'
					width={wp(100)}
				>
					<BaseButton
						button={{
							backgroundColor: '$primary400',
							marginBottom: 10,
							rounded: '$lg',
							width: wp(90),
							onPress: () => formMethods.handleSubmit(onSaveAttendance)()
						}}
						isLoading={loading.isAttend}
					>
						Save {isClockIn ? 'Clock In' : 'Clock Out'}
					</BaseButton>
				</View>
			</SafeAreaView>
		</FormProvider>
	)
})

HomeAttendScreen.displayName = 'HomeAttendScreen'

export { HomeAttendScreen }
