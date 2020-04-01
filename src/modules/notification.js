import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const DKEY = 'QRPAY'

export const registerToken = async () => {
	const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
	
	let finalStatus = existingStatus;

	if (existingStatus !== 'granted') {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
		finalStatus = status
	}

	if (finalStatus !== 'granted') throw new Error('No notification token')

	const token = await Notifications.getExpoPushTokenAsync()
	console.log('NOTIFICATION_TOKEN: ', token)

	return token
}