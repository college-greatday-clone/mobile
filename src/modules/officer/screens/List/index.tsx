// React
import { memo } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { View, Text, ScrollView } from 'react-native'

// Components
import { BaseGreatDayBanner, BaseBox } from '@/modules/app/components'

// React Native Responsive
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const OfficerListScreen = memo(() => {
	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View style={{ height: hp(75) }}>
				<ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
					<View className='px-4'>
						<Text className='font-extrabold text-[#000] text-[16px] mb-4'>
							Your Projects Officers
						</Text>
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
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
})

OfficerListScreen.displayName = 'OfficerListScreen'

export { OfficerListScreen }
