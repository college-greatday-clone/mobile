// React
import { memo, useCallback } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { ScrollView } from 'react-native'

// Glue Stack
import { View, HStack, VStack, Text, Box } from '@gluestack-ui/themed'

// Components
import {
	BaseGreatDayBanner,
	BaseBox,
	BaseButton
} from '@/modules/app/components'

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

				<View paddingHorizontal={20}>
					<Text fontSize={16} fontWeight={'$bold'} marginBottom={10}>
						Companies
					</Text>
					<BaseBox>
						<VStack marginBottom={10}>
							<Text fontSize={14} color='#000' fontWeight={'$bold'}>
								PT.GITS Indonesia
							</Text>
							<Text fontSize={12}>Jakarta · 100 - 500 employee</Text>
							<Text fontSize={12}>hrmanager@gits.id · 081234567890</Text>
						</VStack>
						<HStack
							w='$full'
							alignItems='center'
							justifyContent='space-between'
							space='sm'
						>
							<Box w='$1/2'>
								<BaseButton
									button={{
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
							</Box>
							<Box w='$1/2'>
								<BaseButton
									button={{
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
							</Box>
						</HStack>
					</BaseBox>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
})

CompanyRegistrationScreen.displayName = 'CompanyRegistrationScreen'

export { CompanyRegistrationScreen }
