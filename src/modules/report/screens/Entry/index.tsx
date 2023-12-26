// React
import { memo, useCallback, useState } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// React Native
import { ScrollView, TouchableOpacity } from 'react-native'

// Components
import {
	BaseBox,
	BaseGreatDayBanner,
	BaseButton,
	FormSelect
} from '@/modules/app/components'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Glue Stack
import {
	Text,
	VStack,
	View,
	HStack,
	Box,
	Actionsheet,
	ActionsheetDragIndicatorWrapper,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetItem,
	Image,
	Divider
} from '@gluestack-ui/themed'

// Types
import { THomeScreenProps } from './types'

// React Native Responsive
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen'

// Assets
import WarningRedImage from '@/assets/images/warning-red.png'

const ReportEntryScreen = memo(() => {
	return (
		<SafeAreaView className='flex-1 bg-white'>
			<BaseGreatDayBanner />

			<View paddingHorizontal={20}>
				<HStack w='$full' alignItems='center' justifyContent='space-between'>
					<Box w='$1/3'>
						<FormSelect
							onChange={() => {
								//
							}}
							value={'10-50'}
							placeholder='Select Days'
							emptyItemPlaceholder='No Working Hour Available'
							data={[
								{ label: '10-50', value: '10-50' },
								{ label: '50-100', value: '50-100' },
								{ label: '100-500', value: '100-500' },
								{ label: '500-1000', value: '500-1000' }
							]}
						/>
					</Box>
					<Box w='$1/3'>
						<BaseButton button={{ size: 'sm', backgroundColor: '$primary400' }}>
							Unduh PDF
						</BaseButton>
					</Box>
				</HStack>

				<View h={hp(75)}>
					<ScrollView
						contentContainerStyle={{ paddingBottom: 30 }}
						showsVerticalScrollIndicator={false}
					>
						{[...Array(1)].map((res, index) => (
							<View marginTop={20} marginBottom={5}>
								<VStack space='md'>
									<BaseBox>
										<VStack space='md' paddingLeft={15}>
											<VStack>
												<Text color='#000' fontSize={14} fontWeight={'$bold'}>
													24 Nov 2023
												</Text>
												<Text color='#000' fontSize={14} fontWeight={'$normal'}>
													Regular Office Hour [08:00 - 17:00] - Remote
												</Text>
											</VStack>

											<HStack w='$full' alignItems='center'>
												<VStack w='$1/2'>
													<Text
														color='$primary400'
														fontSize={14}
														fontWeight={'$bold'}
													>
														Clock In
													</Text>
													<Text color='#000' fontSize={14} fontWeight={'$bold'}>
														08:00
													</Text>
												</VStack>
												<VStack
													alignSelf='flex-start'
													justifyContent='flex-start'
												>
													<Text
														color='$primary400'
														fontSize={14}
														fontWeight={'$bold'}
													>
														Clock Out
													</Text>
													<Text color='#000' fontSize={14} fontWeight={'$bold'}>
														17:00
													</Text>
												</VStack>
											</HStack>

											<HStack space='md'>
												<Text
													color='$primary400'
													fontSize={14}
													fontWeight={'$bold'}
												>
													Status
												</Text>
												<Text
													color='$success400'
													fontSize={14}
													fontWeight={'$bold'}
												>
													Approved
												</Text>
											</HStack>

											<VStack space='xs'>
												<Text
													color='$primary400'
													fontSize={14}
													fontWeight={'$bold'}
												>
													Task Management
												</Text>
												<Text color='#000' fontSize={14}>
													Setup project baru, memasang authentication dan
													deploying to production server{' '}
													{index === 9 ? 'Last' : ''}
												</Text>
											</VStack>

											<HStack
												alignItems='center'
												space='xs'
												backgroundColor={'rgba(255, 0, 0, 0.10)'}
												paddingHorizontal={10}
												paddingVertical={5}
												borderRadius={5}
											>
												<Image
													source={WarningRedImage}
													width={24}
													height={24}
													alt='Warning Late For Work'
												/>
												<Text fontSize={12} color='$red400'>
													You are Late for Work
												</Text>
											</HStack>
										</VStack>
									</BaseBox>
								</VStack>
							</View>
						))}
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
	)
})

ReportEntryScreen.displayName = 'ReportEntryScreen'

export { ReportEntryScreen }
