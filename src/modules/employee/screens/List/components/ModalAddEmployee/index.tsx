// React
import { memo, useState, useCallback, useEffect, useMemo } from 'react'

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
import {
	EWorkType,
	EWorkingHour
} from '@/modules/app/constants/common.constant'

// Redux
import {
	useEmployee_storeMutation,
	useLazyEmployee_positionListQuery,
	useLazyEmployee_picListQuery
} from '@/modules/employee/redux'

// Utils
import {
	renderWorkType,
	renderWorkingHour
} from '@/modules/app/utils/common.util'

const schemaValidation = yup.object({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).max(32).required(),
	workType: yup.string().required(),
	workingHour: yup.string().required(),
	positionId: yup.string().required(),
	isPic: yup.boolean()
})

const ModalAddEmployee = memo(
	({ isOpen, onClose, onSuccess }: TModalAddEmployeeProps) => {
		const formMethods = useForm<TEmployeeAddForm>({
			defaultValues: EMPLOYEE_ADD_FORM,
			resolver: yupResolver(schemaValidation),
			mode: 'all'
		})
		const [isPasswordVisible, setIsPasswordVisible] = useState(false)
		const [store] = useEmployee_storeMutation()
		const [fetchPositionList, { data: positionList }] =
			useLazyEmployee_positionListQuery()
		const [fetchEmployeePicList, { data: employeePicList }] =
			useLazyEmployee_picListQuery()
		const [loading, setLoading] = useState({
			isStore: false
		})
		const _positionList = useMemo((): { label: string; value: string }[] => {
			if (positionList) {
				return positionList.result.map(position => ({
					label: position.name,
					value: position.id
				}))
			} else {
				return []
			}
		}, [positionList])
		const _employeePicList = useMemo((): { label: string; value: string }[] => {
			if (employeePicList) {
				return employeePicList.result.map(pic => ({
					label: pic.user.name,
					value: pic.id
				}))
			} else {
				return []
			}
		}, [employeePicList])

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
		 * @description Do anything when modal open or close
		 *
		 * @return {void} void
		 */
		useEffect(() => {
			// Do when modal is open
			if (isOpen) {
				formMethods.reset()
				fetchPositionList()
				fetchEmployeePicList()
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
				handleLoading('isStore', true)

				try {
					const mapForm = {
						...form,
						isPic: form?.isPic || false,
						picList: [form.picList as unknown as string] as string[]
					}

					await store({ body: mapForm }).unwrap()

					onClose()

					if (onSuccess) onSuccess()
				} catch (err) {
					console.error('err', err)
				} finally {
					handleLoading('isStore', false)
				}
			},
			[handleLoading, store, onClose, onSuccess]
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
								render={({
									field: { value, onBlur, onChange },
									fieldState
								}) => (
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
								render={({
									field: { value, onBlur, onChange },
									fieldState
								}) => (
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
								render={({
									field: { value, onBlur, onChange },
									fieldState
								}) => (
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
											data={Object.keys(EWorkType).map(workType => ({
												label: renderWorkType(workType as unknown as EWorkType),
												value: workType
											}))}
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
											data={Object.keys(EWorkingHour).map(workingHour => ({
												label: renderWorkingHour(
													workingHour as unknown as EWorkingHour
												),
												value: workingHour
											}))}
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
											data={_positionList}
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
												value
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
										value={value as unknown as string}
										onChange={onChange}
										error={fieldState?.error}
										emptyItemPlaceholder='No PIC Available'
										data={_employeePicList}
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
	}
)

ModalAddEmployee.displayName = 'ModalAddEmployee'

export { ModalAddEmployee }
