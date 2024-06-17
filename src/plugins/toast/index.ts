// React Native Toast
import { Popup, Toast } from 'react-native-popup-confirm-toast'

export const toastOk = (message?: string): void => {
	Toast.show({
		title: 'Sukses',
		text: message || 'Anda telah sukses untuk membuat permintaan ke server',
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
		title: 'Sukses!',
		textBody: message || 'Berhasil membuat permintaan ke server',
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
		textBody: message || 'Terdapat kesalahan di server',
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
			title: 'Konfirmasi',
			textBody: message || 'Apakah anda ingin melakukan aksi ini?',
			buttonText: 'Ya',
			confirmText: 'Tidak',
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
