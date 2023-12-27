// React
import { memo, useCallback } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// Components
import { BaseButton, FormTextArea } from '@/modules/app/components'

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

// Plugins
import { popupConfirm } from '@/plugins/toast'

// React Hook Form
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { HOME_ATTEND_FORM } from '@/modules/home/constants/home.constant'

const schemaValidation = yup
	.object({
		remark: yup.string().required()
	})
	.required()

const HomeAttendScreen = memo(() => {
	const navigation = useNavigation<THomeAttendScreenProps['navigation']>()
	const route = useRoute<THomeAttendScreenProps['route']>()
	const formMethods = useForm<THomeAttendForm>({
		resolver: yupResolver(schemaValidation),
		defaultValues: HOME_ATTEND_FORM,
		mode: 'all'
	})

	/**
	 * @description Save attendance
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onSaveAttendance = useCallback(async (): Promise<void> => {
		const response = await popupConfirm()
		if (response) navigation.navigate(EHomeStackNavigation.INDEX)
	}, [navigation])

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
								Clock in
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
							Huda Prasetyo
						</Text>
						<Text
							fontSize={15}
							lineHeight={'$md'}
							color={'$black'}
							fontWeight={'$thin'}
						>
							Fullstack Developer
						</Text>
					</VStack>

					<VStack
						justifyContent='center'
						alignItems='center'
						marginTop={20}
						space={'sm'}
					>
						<Text fontSize={13} lineHeight={'$md'} color={'$black'}>
							25 Nov 2023
						</Text>
						<Text
							fontSize={24}
							lineHeight={'$md'}
							color={'$primary400'}
							fontWeight={'$bold'}
						>
							08:00
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
					>
						<Text fontSize={13} fontWeight={'$semibold'}>
							Task Management
						</Text>
						<View width={wp(80)}>
							<Controller
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
							onPress: () => onSaveAttendance()
						}}
					>
						Save Clock in
					</BaseButton>
				</View>
			</SafeAreaView>
		</FormProvider>
	)
})

HomeAttendScreen.displayName = 'HomeAttendScreen'

export { HomeAttendScreen }
