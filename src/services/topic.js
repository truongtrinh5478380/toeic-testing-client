import axios from "axios"
import { BASE_URL } from "../constants/base-url"

async function getTopicById(id) {
	try {
		const { data } = await axios.get(`${BASE_URL}/topic/get-by-id/${id}`)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
async function addTopic(topic) {
	try {
		const { data } = await axios.post(`${BASE_URL}/topic/create`, topic)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}

async function submitTest(payload) {
	try {
		const { data } = await axios.post(`${BASE_URL}/result/submit`, payload)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
async function getTopic() {
	try {
		const { data } = await axios.get(`${BASE_URL}/topic/get-all`)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
async function deleteTopic(idTopic) {
	try {
		const { data } = await axios.delete(`${BASE_URL}/topic/delete/` + idTopic)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
export {
	addTopic,
	getTopicById,
	getTopic,
	submitTest,
	deleteTopic
}