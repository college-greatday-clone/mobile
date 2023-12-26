// React
import { memo, useState, useCallback, useEffect } from 'react'

// React Native
import { View } from 'react-native'

// Glue Stack
import {
	Modal,
	ModalBackdrop,
	ModalContent,
	ModalHeader,
	VStack,
	Heading,
	ModalBody,
	ModalFooter
} from '@gluestack-ui/themed'
import { EyeIcon, EyeOffIcon } from '@gluestack-ui/themed'

// Components
import {
	FormInput,
	FormSelect,
	FormCheckbox,
	BaseButton
} from '@/modules/app/components'

// Types
import { TModalAddEmployeeProps } from './types'
import { TEmployeeAddForm } from '@/modules/employee/types/employee.type'

// React Native Responsive
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// React Hook Form
import { FormProvider, Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { EMPLOYEE_ADD_FORM } from '@/modules/employee/constants/employee.constant'

const schemaValidation = yup.object({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).max(32).required(),
	workType: yup.string().required(),
	workingHour: yup.string().required(),
	positionId: yup.string().required(),
	isPic: yup.boolean(),
	picList: yup.array().of(yup.string()).required()
})

const ModalAddEmployee = memo(({ isOpen, onClose }: TModalAddEmployeeProps) => {
	const formMethods = useForm<TEmployeeAddForm>({
		defaultValues: EMPLOYEE_ADD_FORM,
		resolver: yupResolver(schemaValidation),
		mode: 'all'
	})
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	/**
	 * @description Do anything when modal open or close
	 *
	 * @return {void} void
	 */
	useEffect(() => {
		// Do when modal is open
		if (isOpen) {
			formMethods.reset()
		}

		// Do when modal is close
	}, [isOpen, formMethods])

	/**
	 * @description Handle form submit
	 *
	 * @param {TEmployeeAddForm} form
	 *
	 * @return {void} void
	 */
	const onSubmit = useCallback(
		async (form: TEmployeeAddForm): Promise<void> => {
			console.log('form', form)
		},
		[]
	)

	return (
		<FormProvider {...formMethods}>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose()
				}}
			>
				<ModalBackdrop />
				<ModalContent>
					<ModalHeader borderBottomWidth='$0'>
						<VStack space='sm'>
							<Heading size='md'>Add Employee</Heading>
						</VStack>
					</ModalHeader>
					<ModalBody>
						<Controller
							control={formMethods.control}
							name='name'
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
							name='email'
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
						<View className='mb-3'>
							<Controller
								control={formMethods.control}
								name='workType'
								render={({ field: { value, onChange }, fieldState }) => (
									<FormSelect
										placeholder='Select Work Type'
										value={value}
										onChange={onChange}
										error={fieldState?.error}
										emptyItemPlaceholder='No Work Type Available'
										data={[
											{ label: '10-50', value: '10-50' },
											{ label: '50-100', value: '50-100' },
											{ label: '100-500', value: '100-500' },
											{ label: '500-1000', value: '500-1000' }
										]}
									/>
								)}
							/>
						</View>
						<View className='mb-3'>
							<Controller
								control={formMethods.control}
								name='workingHour'
								render={({ field: { value, onChange }, fieldState }) => (
									<FormSelect
										placeholder='Select Working Hour'
										value={value}
										onChange={onChange}
										error={fieldState?.error}
										emptyItemPlaceholder='No Working Hour Available'
										data={[
											{ label: '10-50', value: '10-50' },
											{ label: '50-100', value: '50-100' },
											{ label: '100-500', value: '100-500' },
											{ label: '500-1000', value: '500-1000' }
										]}
									/>
								)}
							/>
						</View>
						<View className='mb-3'>
							<Controller
								control={formMethods.control}
								name='positionId'
								render={({ field: { value, onChange }, fieldState }) => (
									<FormSelect
										placeholder='Select Position'
										value={value}
										onChange={onChange}
										error={fieldState?.error}
										emptyItemPlaceholder='No Position Available'
										data={[
											{ label: '10-50', value: '10-50' },
											{ label: '50-100', value: '50-100' },
											{ label: '100-500', value: '100-500' },
											{ label: '500-1000', value: '500-1000' }
										]}
									/>
								)}
							/>
						</View>
						<View className='mb-3'>
							<Controller
								control={formMethods.control}
								name='isPic'
								render={({ field: { value, onChange }, fieldState }) => (
									<FormCheckbox
										checkbox={{
											onChange,
											value: Boolean(value)
										}}
										error={fieldState?.error}
									>
										PIC
									</FormCheckbox>
								)}
							/>
						</View>
						<Controller
							control={formMethods.control}
							name='picList'
							render={({ field: { value, onChange }, fieldState }) => (
								<FormSelect
									placeholder='Select PIC'
									value={value}
									onChange={onChange}
									error={fieldState?.error}
									emptyItemPlaceholder='No PIC Available'
									data={[
										{ label: '10-50', value: '10-50' },
										{ label: '50-100', value: '50-100' },
										{ label: '100-500', value: '100-500' },
										{ label: '500-1000', value: '500-1000' }
									]}
								/>
							)}
						/>
					</ModalBody>
					<ModalFooter borderTopWidth='$0'>
						<BaseButton
							button={{
								width: wp(34),
								variant: 'outline',
								borderColor: '$primary400',
								onPress: () => {
									onClose()
								}
							}}
							buttonText={{
								color: '$primary400'
							}}
						>
							Cancel
						</BaseButton>
						<BaseButton
							button={{
								width: wp(34),
								marginLeft: 10,
								backgroundColor: '$primary400',
								onPress: () => {
									formMethods.handleSubmit(onSubmit)()
								}
							}}
						>
							Add
						</BaseButton>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</FormProvider>
	)
})

ModalAddEmployee.displayName = 'ModalAddEmployee'

export { ModalAddEmployee }
