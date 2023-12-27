// React Native Toast
import { Popup, Toast } from 'react-native-popup-confirm-toast'

export const toastOk = (message?: string): void => {
	Toast.show({
		title: 'Success',
		text: message || 'You successfully do this action',
		backgroundColor: '#702c91',
		timeColor: '#440f5f',
		timing: 3000,
		position: 'bottom',
		statusBarType: 'dark-content',
		onCloseComplete: () => {
			//
		},
		onOpenComplete: () => {
			//
		}
	})
}

export const popupOk = (message?: string, callback?: () => void) => {
	Popup.show({
		type: 'success',
		title: 'Success!',
		textBody: message || 'You successfully making some request to server',
		buttonText: 'OK',
		callback: () => {
			if (callback) callback()
		},
		okButtonStyle: {
			backgroundColor: '#FE881A'
		}
	})
}

export const popupError = (message?: string, callback?: () => void) => {
	Popup.show({
		type: 'danger',
		title: 'Error!',
		textBody: message || 'Something went wrong from the server',
		buttonText: 'OK',
		callback: () => {
			if (callback) callback()

			Popup.hide()
		},
		okButtonStyle: {
			backgroundColor: '#FE881A'
		}
	})
}

export const popupConfirm = (message?: string): Promise<boolean> => {
	return new Promise(resolve => {
		Popup.show({
			type: 'confirm',
			title: 'Confirmation',
			textBody: message || 'Are you sure want to do this action',
			buttonText: 'Yes',
			confirmText: 'No',
			okButtonStyle: {
				backgroundColor: '#FE881A'
			},
			callback: () => {
				Popup.hide()
				resolve(true)
			},
			cancelCallback: () => {
				Popup.hide()
				resolve(false)
			}
		})
	})
}
