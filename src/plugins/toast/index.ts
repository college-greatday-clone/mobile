// React Native Toast
import { Popup } from 'react-native-popup-confirm-toast'

export const toastOk = (message?: string, callback?: () => void) => {
	Popup.show({
		type: 'success',
		title: 'Success!',
		textBody: message || 'You successfully making some request to server',
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

export const toastError = (message?: string, callback?: () => void) => {
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

export const toastConfirm = (
	message?: string,
	callback?: { confirmCallback?: () => void; cancelCallback?: () => void }
) => {
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
			if (callback?.confirmCallback) callback.confirmCallback()
		},
		cancelCallback: () => {
			Popup.hide()
			if (callback?.cancelCallback) callback.cancelCallback()
		}
	})
}
