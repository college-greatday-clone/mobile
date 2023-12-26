// React
import { memo } from 'react'

// Safe Area Context
import { SafeAreaView } from 'react-native-safe-area-context'

// Components
import { BaseButton } from '@/modules/app/components'
import { AttendCamera } from './components'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// React Native
import { TouchableOpacity } from 'react-native'

// Glue Stack
import {
	VStack,
	View,
	Text,
	Image,
	ChevronLeftIcon,
	Icon,
	HStack
} from '@gluestack-ui/themed'

// Types
import { THomeAttendScreenProps } from './types'

// React Native Responsive
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Assets
import CameraWhiteImage from '@/assets/images/camera-white.png'
import WarningRedImage from '@/assets/images/warning-red.png'

// Constants
import { EHomeStackNavigation } from '@/modules/app/constants/navigation.constant'

const HomeAttendScreen = memo(() => {
	const navigation = useNavigation<THomeAttendScreenProps['navigation']>()

	return <AttendCamera />

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<HStack
				width={wp(100)}
				alignItems='center'
				flexDirection='row'
				backgroundColor='$primary400'
				height={50}
				space='xs'
			>
				<TouchableOpacity
					onPress={() => navigation.navigate(EHomeStackNavigation.INDEX)}
					className='flex flex-row items-center'
				>
					<Icon as={ChevronLeftIcon} color='#fff' size='xl' />
					<Text fontSize={18} fontWeight={'$medium'} color='#fff'>
						Clock in
					</Text>
				</TouchableOpacity>
			</HStack>

			<VStack
				justifyContent='center'
				alignItems='center'
				marginTop={20}
				space={'sm'}
			>
				<Text
					fontSize={18}
					lineHeight={'$md'}
					color={'$black'}
					fontWeight={'$bold'}
				>
					Huda Prasetyo
				</Text>
				<Text
					fontSize={15}
					lineHeight={'$md'}
					color={'$black'}
					fontWeight={'$thin'}
				>
					Fullstack Developer
				</Text>
			</VStack>

			<VStack
				justifyContent='center'
				alignItems='center'
				marginTop={20}
				space={'sm'}
			>
				<Text fontSize={13} lineHeight={'$md'} color={'$black'}>
					25 Nov 2023
				</Text>
				<Text
					fontSize={24}
					lineHeight={'$md'}
					color={'$primary400'}
					fontWeight={'$bold'}
				>
					08:00
				</Text>
				<HStack alignItems='center' space='xs'>
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

			<VStack justifyContent='center' alignItems='center' marginTop={20}>
				<View
					width={wp(40)}
					height={180}
					backgroundColor='#D9D9D9'
					borderRadius='$md'
					alignItems='center'
					justifyContent='center'
				>
					<Image
						source={CameraWhiteImage}
						width={40}
						height={40}
						alt='Camera Attendance'
					/>
				</View>
			</VStack>

			<View
				position='absolute'
				bottom={0}
				justifyContent='center'
				alignItems='center'
				width={wp(100)}
			>
				<BaseButton
					button={{
						backgroundColor: '$primary400',
						marginBottom: 10,
						rounded: '$lg',
						width: wp(90)
					}}
				>
					Save Clock in
				</BaseButton>
			</View>
		</SafeAreaView>
	)
})

HomeAttendScreen.displayName = 'HomeAttendScreen'

export { HomeAttendScreen }
