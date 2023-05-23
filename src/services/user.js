import axios from 'axios'
import { BASE_URL } from '../constants/base-url'

async function getUser() {
	try {
		const { data, error } = await axios.get(`${BASE_URL}/user/get-profile`)
		if (!data || error) throw new Error()

		return data.data
	} catch (error) {
		return null
	}
}
async function updateUser(fullname, email, gender, phoneNumber, username) {
	try {
		const { data, error } = await axios.put(`${BASE_URL}/user/update-profile`, { fullname, email, gender, phoneNumber, username })
		if (!data || error) throw new Error()

		return data.data
	} catch (error) {
		return null
	}
}
export {
	getUser,
	updateUser
}