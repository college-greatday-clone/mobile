// React
import { memo, useCallback, useState } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { ScrollView } from 'react-native'

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
							PT. GITS Indonesia
						</Text>
						<BaseBox>
							<HStack space='md' alignItems='center'>
								<Box
									w={40}
									h={40}
									borderRadius={'$full'}
									backgroundColor={'#D9D9D9'}
								/>
								<VStack>
									<Text fontSize={14} color='#000' fontWeight={'$semibold'}>
										Huda Prasetyo
									</Text>
									<Text fontSize={13} fontWeight={'$light'} color='#000'>
										Employee · Full Stack Developer
									</Text>
								</VStack>
							</HStack>
						</BaseBox>
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
			/>
		</SafeAreaView>
	)
})

EmployeeListScreen.displayName = 'EmployeeListScreen'

export { EmployeeListScreen }
