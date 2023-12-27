// React
import { memo, useCallback, useState, useEffect } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { ScrollView, TouchableOpacity } from 'react-native'

// Glue Stack
import { View, Text, HStack, Box, VStack } from '@gluestack-ui/themed'

// Components
import {
	BaseGreatDayBanner,
	BaseBox,
	BaseButton
} from '@/modules/app/components'
import { ModalAddEmployee } from './components'

// React Native Responsive
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Types
import { TEmployeeListScreenProps } from './types'

// Constants
import { EEmployeeStackNavigation } from '@/modules/app/constants/navigation.constant'

// Redux
import { useLazyEmployee_listQuery } from '@/modules/employee/redux'
import { authGetAuthenticatedUserCompanyName } from '@/modules/auth/redux'

// Plugins
import { useAppSelector } from '@/plugins/redux'

const EmployeeListScreen = memo(() => {
	const navigation = useNavigation<TEmployeeListScreenProps['navigation']>()
	const [modalOptions, setModalOptions] = useState({
		isAddEmployeeOpen: false
	})
	const [fetchEmployeeList, { data: employeeList }] =
		useLazyEmployee_listQuery()
	const [loading, setLoading] = useState({
		isEmployeeList: false
	})
	const authenticatedUserCompanyName = useAppSelector(
		authGetAuthenticatedUserCompanyName
	)

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
	 * @description Get employee list
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const getEmployeeList = useCallback(async (): Promise<void> => {
		handleLoading('isEmployeeList', true)
		try {
			await fetchEmployeeList().unwrap()
		} catch (err) {
			console.error('err', err)
		} finally {
			handleLoading('isEmployeeList', false)
		}
	}, [handleLoading, fetchEmployeeList])

	/**
	 * @description Do anything when start to came to this component
	 *
	 * @return {void} void
	 */
	useEffect(() => {
		getEmployeeList()
	}, [])

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

			<View style={{ height: hp(75) }}>
				<ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
					<View paddingHorizontal={20}>
						<Text
							color='#000'
							fontWeight={'$extrabold'}
							fontSize={16}
							marginBottom={10}
						>
							{authenticatedUserCompanyName}
						</Text>
						{employeeList &&
							employeeList.result.map(employee => (
								<TouchableOpacity
									key={employee.id}
									onPress={() =>
										navigation.navigate(
											EEmployeeStackNavigation.DETAIL,
											employee
										)
									}
								>
									<View marginBottom={10}>
										<BaseBox>
											<HStack space='md' alignItems='center'>
												<Box
													w={40}
													h={40}
													borderRadius={'$full'}
													backgroundColor={'#D9D9D9'}
												/>
												<VStack>
													<Text
														fontSize={14}
														color='#000'
														fontWeight={'$semibold'}
													>
														{employee.user.name}
													</Text>
													<Text
														fontSize={13}
														fontWeight={'$light'}
														color='#000'
													>
														Employee · {employee.position.name}
													</Text>
												</VStack>
											</HStack>
										</BaseBox>
									</View>
								</TouchableOpacity>
							))}
					</View>
				</ScrollView>
			</View>

			<HStack
				w='$full'
				alignItems='center'
				justifyContent='center'
				position='absolute'
				bottom={0}
				marginBottom={10}
			>
				<BaseButton
					button={{
						width: wp(90),
						backgroundColor: '$primary400',
						rounded: '$lg',
						onPress: () => {
							handleModal('isAddEmployeeOpen', true)
						}
					}}
				>
					Add Employee
				</BaseButton>
			</HStack>

			<ModalAddEmployee
				isOpen={modalOptions.isAddEmployeeOpen}
				onClose={() => handleModal('isAddEmployeeOpen', false)}
				onSuccess={() => {
					getEmployeeList()
				}}
			/>
		</SafeAreaView>
	)
})

EmployeeListScreen.displayName = 'EmployeeListScreen'

export { EmployeeListScreen }
