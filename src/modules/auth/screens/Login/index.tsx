// React
import { memo, useState, useEffect, useMemo, useCallback } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { View, Text } from 'react-native'

// Images
import GreatDayLogo from '@/assets/images/great-day-logo.png'

// React Hook Form
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
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

// Redux
import {
	useLazyAuth_companyListQuery,
	useAuth_loginMutation,
	auth_HANDLE_TOKENS,
	auth_HANDLE_AUTHENTICATED_USER,
	useLazyAuth_meQuery
} from '@/modules/auth/redux'

// Lodash
import debounce from 'lodash.debounce'

// Plugins
import { useAppDispatch } from '@/plugins/redux'

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
	const watchEmail = useWatch({ control: formMethods.control, name: 'email' })
	const [
		fetchCompanyList,
		{
			data: companyList,
			isLoading: isCompanyListLoading,
			isFetching: isCompanyListFetching
		}
	] = useLazyAuth_companyListQuery()
	const _companyList = useMemo((): { label: string; value: string }[] => {
		if (companyList) {
			return companyList.result.map(company => ({
				label: company.name,
				value: company.id
			}))
		} else {
			return []
		}
	}, [companyList])
	const [loading, setLoading] = useState({
		isLogin: false
	})
	const [login] = useAuth_loginMutation()
	const [getAuthenticatedUser] = useLazyAuth_meQuery()
	const dispatch = useAppDispatch()

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
	 * @description Get company list
	 *
	 * @param {string} email
	 *
	 * @return {void} void
	 */
	const getCompanyList = debounce((email: string): void => {
		fetchCompanyList({ params: { email } }).unwrap()
	}, 900)

	/**
	 * @description Watch email change
	 *
	 * @return {void} void
	 */
	useEffect(() => {
		if (watchEmail !== '') {
			getCompanyList(watchEmail)
		}
	}, [watchEmail])

	/**
	 * @description Handle submit
	 *
	 * @param {TAuthLoginForm} form
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onSubmit = useCallback(
		async (form: TAuthLoginForm): Promise<void> => {
			handleLoading('isLogin', false)

			try {
				const loginResponse = await login({ body: form }).unwrap()

				dispatch(auth_HANDLE_TOKENS(loginResponse.result))

				const authenticatedUser = await getAuthenticatedUser().unwrap()

				dispatch(auth_HANDLE_AUTHENTICATED_USER(authenticatedUser.result))
			} finally {
				handleLoading('isLogin', true)
			}
		},
		[handleLoading, login]
	)

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
								data={_companyList}
							/>
						)}
					/>

					<View className='mt-8 flex flex-col'>
						<BaseButton
							button={{
								backgroundColor: '$primary400',
								isDisabled: !formMethods.formState.isValid,
								onPress: () => formMethods.handleSubmit(onSubmit)()
							}}
							isLoading={
								isCompanyListLoading || isCompanyListFetching || loading.isLogin
							}
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
