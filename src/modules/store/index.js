import { AsyncStorage } from 'react-native';

const STORE_KEY = 'qrpay:store:33'

let values = {}
let loaded = false

const loadAsync = async () => {
	if (loaded) return
	
	try {
		const rawValues = await AsyncStorage.getItem(STORE_KEY)

		if (rawValues) values = JSON.parse(rawValues)
	} catch (err) {
		console.warn('Could not read from Async Store', err)
	} finally {
		loaded = true
	}
}

const checkout = () => (AsyncStorage.setItem(STORE_KEY, JSON.stringify(values)))

const get = (key) => (values[key] || null)

const set = (key, value) => {
	values[key] = value

	checkout()
}

export default {
	loadAsync,
	get,
	set,
	checkout,
}