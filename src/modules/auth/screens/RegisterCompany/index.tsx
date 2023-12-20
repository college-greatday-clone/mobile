// React
import { memo, useState } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { View, Text, ScrollView } from 'react-native'

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
import { TAuthRegisterCompanyForm } from '@/modules/auth/types/auth.type'
import { TAuthRegisterCompanyScreenProps } from './types.ts'

// Constants
import { AUTH_REGISTER_COMPANY_FORM } from '@/modules/auth/constants/auth.constant'
import { BaseButton } from '@/modules/app/components/base'

// React Navigation
import { useNavigation } from '@react-navigation/native'
import { EAuthStackNavigation } from '@/modules/app/constants/navigation.constant.ts'

const schemaValidation = yup
	.object()
	.shape({
		user: yup.object().shape({
			name: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().min(8).required()
		}),
		company: yup.object().shape({
			name: yup.string().required(),
			phoneNumber: yup.string().min(5).max(13).required(),
			capacity: yup.string().required(),
			city: yup.string().required()
		})
	})
	.required()

const AuthRegisterCompanyScreen = memo(() => {
	const formMethods = useForm<TAuthRegisterCompanyForm>({
		defaultValues: AUTH_REGISTER_COMPANY_FORM,
		resolver: yupResolver(schemaValidation),
		mode: 'all'
	})
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const navigation = useNavigation<TAuthRegisterCompanyScreenProps>()

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

			<ScrollView>
				<View className='px-4'>
					<FormProvider {...formMethods}>
						<Controller
							control={formMethods.control}
							name='user.name'
							render={({ field: { value, onBlur, onChange }, fieldState }) => (
								<FormInput
									inputField={{
										placeholder: 'Enter User Name',
										value,
										onBlur,
										onChangeText: onChange
									}}
									input={{ variant: 'underlined' }}
									error={fieldState?.error}
								/>
							)}
						/>
						<Controller
							control={formMethods.control}
							name='user.email'
							render={({ field: { value, onBlur, onChange }, fieldState }) => (
								<FormInput
									inputField={{
										placeholder: 'Enter User Email Address',
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
							name='user.password'
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
							name='company.name'
							render={({ field: { value, onBlur, onChange }, fieldState }) => (
								<FormInput
									inputField={{
										placeholder: 'Enter Company Name',
										value,
										onBlur,
										onChangeText: onChange
									}}
									input={{ variant: 'underlined' }}
									error={fieldState?.error}
								/>
							)}
						/>
						<Controller
							control={formMethods.control}
							name='company.phoneNumber'
							render={({ field: { value, onBlur, onChange }, fieldState }) => (
								<FormInput
									inputField={{
										placeholder: 'Enter Company Phone Number',
										value,
										onBlur,
										onChangeText: onChange
									}}
									input={{ variant: 'underlined' }}
									error={fieldState?.error}
								/>
							)}
						/>
						<Controller
							control={formMethods.control}
							name='company.city'
							render={({ field: { value, onBlur, onChange }, fieldState }) => (
								<FormInput
									inputField={{
										placeholder: 'Enter Company City',
										value,
										onBlur,
										onChangeText: onChange
									}}
									input={{ variant: 'underlined' }}
									error={fieldState?.error}
								/>
							)}
						/>
						<Controller
							control={formMethods.control}
							name='company.capacity'
							render={({ field: { value, onChange }, fieldState }) => (
								<FormSelect
									placeholder='Select Company Capacity'
									value={value}
									onChange={onChange}
									error={fieldState?.error}
									emptyItemPlaceholder='No Capacity'
									data={[
										{ label: '10-50', value: '10-50' },
										{ label: '50-100', value: '50-100' },
										{ label: '100-500', value: '100-500' },
										{ label: '500-1000', value: '500-1000' }
									]}
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
								Register Company
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
									onPress: () =>
										navigation.navigate(EAuthStackNavigation.AUTH_LOGIN)
								}}
							>
								Back To Login
							</BaseButton>
						</View>
					</FormProvider>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
})

AuthRegisterCompanyScreen.displayName = 'AuthRegisterCompanyScreen'

export { AuthRegisterCompanyScreen }
