// React
import { memo, useCallback, useState } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

// Components
import {
	BaseGreatDayBanner,
	BaseBox,
	BaseButton
} from '@/modules/app/components'
import { ModalAddEmployee } from './components'

// React Native Responsive
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Types
import { TEmployeeListScreenProps } from './types'

// Constants
import { EEmployeeStackNavigation } from '@/modules/app/constants/navigation.constant'

const EmployeeListScreen = memo(() => {
	const navigation = useNavigation<TEmployeeListScreenProps['navigation']>()
	const [modalOptions, setModalOptions] = useState({
		isAddEmployeeOpen: false
	})

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
			<ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
				<BaseGreatDayBanner />

				<View className='px-4'>
					<Text className='font-bold text-[16px] mb-4'>PT. GITS Indonesia</Text>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(EEmployeeStackNavigation.DETAIL, { id: '1' })
						}
					>
						<BaseBox className='flex flex-row gap-2 items-center mb-4'>
							<View
								className='w-[40px] h-[40px] rounded-full bg-[#D9D9D9]'
								aria-label='Dump Photo'
							/>
							<View className='flex flex-col gap-1'>
								<Text className='text-[#000] text-[14px] leading-normal font-semibold'>
									Huda Prasetyo
								</Text>
								<Text className='text-[#000] text-[12px] leading-normal font-light'>
									Employee · Full Stack Developer
								</Text>
							</View>
						</BaseBox>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<View className='absolute bottom-0 px-4'>
				<BaseButton
					button={{
						width: wp(90),
						backgroundColor: '$primary400',
						marginBottom: 10,
						rounded: '$lg',
						onPress: () => {
							handleModal('isAddEmployeeOpen', true)
						}
					}}
				>
					Add Employee
				</BaseButton>
			</View>

			<ModalAddEmployee
				isOpen={modalOptions.isAddEmployeeOpen}
				onClose={() => handleModal('isAddEmployeeOpen', false)}
			/>
		</SafeAreaView>
	)
})

EmployeeListScreen.displayName = 'EmployeeListScreen'

export { EmployeeListScreen }
