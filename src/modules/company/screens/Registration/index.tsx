// React
import { memo, useCallback } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { View, Text, ScrollView } from 'react-native'

// Components
import {
	BaseGreatDayBanner,
	BaseBox,
	BaseButton
} from '@/modules/app/components'

// React Native Responsive
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Toast
import { toastConfirm } from '@/plugins/toast'

const CompanyRegistrationScreen = memo(() => {
	/**
	 * @description Decline or Approve handler
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onActionPress = useCallback(async (): Promise<void> => {
		toastConfirm()
	}, [])

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
				<BaseGreatDayBanner />

				<View className='px-4'>
					<Text className='font-light text-[16px] mb-2'>Companies</Text>
					<BaseBox className='flex flex-col gap-2 mt-2'>
						<View className='flex flex-col gap-1 mb-2'>
							<Text className='text-black font-bold text-[14px] leading-normal'>
								PT.GITS Indonesia
							</Text>
							<Text className='text-[12px] leading-normal'>
								Jakarta · 100 - 500 employee
							</Text>
							<Text className='text-[12px] leading-normal'>
								hrmanager@gits.id · 081234567890
							</Text>
						</View>
						<View className='flex flex-row items-center justify-between'>
							<BaseButton
								button={{
									width: wp(40),
									height: 30,
									variant: 'outline',
									borderColor: '$primary400',
									onPress: () => {
										onActionPress()
									}
								}}
								buttonText={{
									color: '$primary400',
									fontSize: 12
								}}
							>
								Decline
							</BaseButton>
							<BaseButton
								button={{
									width: wp(40),
									height: 30,
									backgroundColor: '$primary400',
									onPress: () => {
										onActionPress()
									}
								}}
								buttonText={{
									color: '#fff',
									fontSize: 12
								}}
							>
								Approve
							</BaseButton>
						</View>
					</BaseBox>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
})

CompanyRegistrationScreen.displayName = 'CompanyRegistrationScreen'

export { CompanyRegistrationScreen }
