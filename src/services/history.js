import axios from 'axios'
import { BASE_URL } from '../constants/base-url'

async function getUserResult(history) {
	try {
		const { data } = await axios.get(`${BASE_URL}/result/get-by-user`, history)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
async function getRanking() {
	try {
		const { data } = await axios.get(`${BASE_URL}/result/ranking`)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
export {
	getUserResult,
	getRanking
}