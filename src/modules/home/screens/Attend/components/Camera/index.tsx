// React
import { memo } from 'react'

// React Native Vision Camera
import {
	Camera,
	CameraDevice,
	useCameraDevice
} from 'react-native-vision-camera'

// Types
import { TAttendCameraProps } from './types'

// Glue Stack
import { View, Text } from '@gluestack-ui/themed'

const AttendCamera = memo(
	(props: Omit<TAttendCameraProps, 'device' | 'isActive'>) => {
		const device = useCameraDevice('back')

		return !device ? (
			<View flex={1} justifyContent='center' alignItems='center'>
				<Text color='$red400' fontWeight={'$bold'} fontSize={24}>
					No Camera Found
				</Text>
			</View>
		) : (
			<Camera
				{...props}
				device={device as CameraDevice}
				isActive
				style={{ flex: 1 }}
			/>
		)
	}
)

AttendCamera.displayName = 'AttendCamera'

export { AttendCamera }
