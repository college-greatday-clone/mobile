// React
import { memo, useState } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { View, Text } from 'react-native'

// Images
import GreatDayLogo from '@/assets/images/great-day-logo.png'

// React Hook Form
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// GlueStack
import { EyeIcon, EyeOffIcon, Image } from '@gluestack-ui/themed'
import { FormInput, FormSelect } from '@/modules/app/components'

// Types
import { TAuthLoginForm } from '@/modules/auth/types/auth.type'
import { TAuthLoginScreenProps } from '@/modules/auth/screens/Login/types'

// Constants
import { AUTH_LOGIN_FORM } from '@/modules/auth/constants/auth.constant'
import { BaseButton } from '@/modules/app/components/base'
import { EAuthStackNavigation } from '@/modules/app/constants/navigation.constant.ts'

// React Navigation
import { useNavigation } from '@react-navigation/native'

const schemaValidation = yup
	.object({
		email: yup.string().email().required('Email is required'),
		password: yup.string().required('Password is required'),
		companyId: yup.string().required('Company is required')
	})
	.required()

const AuthLoginScreen = memo(() => {
	const formMethods = useForm<TAuthLoginForm>({
		defaultValues: AUTH_LOGIN_FORM,
		resolver: yupResolver(schemaValidation),
		mode: 'all'
	})
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const navigation = useNavigation<TAuthLoginScreenProps>()

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<View className='my-8 flex-row items-center justify-center'>
				<Image
					source={GreatDayLogo}
					width={180}
					height={60.39}
					alt='GreatDayCloneLogo'
				/>
			</View>

			<View className='px-4'>
				<FormProvider {...formMethods}>
					<Controller
						control={formMethods.control}
						name='email'
						render={({ field: { value, onBlur, onChange }, fieldState }) => (
							<FormInput
								inputField={{
									placeholder: 'Enter Email Address',
									value,
									onBlur,
									onChangeText: value => {
										onChange(value.toLowerCase())
									}
								}}
								input={{ variant: 'underlined' }}
								error={fieldState?.error}
							/>
						)}
					/>
					<Controller
						control={formMethods.control}
						name='password'
						render={({ field: { value, onBlur, onChange }, fieldState }) => (
							<FormInput
								inputField={{
									placeholder: 'Enter Password',
									type: isPasswordVisible ? 'text' : 'password',
									value,
									onBlur,
									onChangeText: onChange
								}}
								input={{ variant: 'underlined' }}
								inputSlot={{
									onPress: () => {
										setIsPasswordVisible(prev => !prev)
									}
								}}
								inputIcon={{
									as: isPasswordVisible ? EyeIcon : EyeOffIcon
								}}
								isRerender={isPasswordVisible}
								error={fieldState?.error}
							/>
						)}
					/>
					<Controller
						control={formMethods.control}
						name='companyId'
						render={({ field: { value, onChange }, fieldState }) => (
							<FormSelect
								placeholder='Select Company'
								value={value}
								onChange={onChange}
								error={fieldState?.error}
								emptyItemPlaceholder='No Company Registered'
								data={[]}
							/>
						)}
					/>

					<View className='mt-8 flex flex-col'>
						<BaseButton
							button={{
								backgroundColor: '$primary400',
								isDisabled: !formMethods.formState.isValid
							}}
						>
							Login
						</BaseButton>

						<View className='flex flex-col items-center justify-center my-5'>
							<Text className='text-[12px] text-[#888]'>Or</Text>
							<Text className='text-[12px] text-[#000] mt-2'>
								Do you want register as a Company?
							</Text>
						</View>

						<BaseButton
							button={{
								backgroundColor: '$primary400',
								onPress: () => {
									navigation.navigate(
										EAuthStackNavigation.AUTH_REGISTER_COMPANY
									)
								}
							}}
						>
							Register Here
						</BaseButton>
					</View>
				</FormProvider>
			</View>
		</SafeAreaView>
	)
})

AuthLoginScreen.displayName = 'AuthLoginScreen'

export { AuthLoginScreen }
