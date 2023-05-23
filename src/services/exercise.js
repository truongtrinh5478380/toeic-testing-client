import axios from "axios"
import { BASE_URL } from "../constants/base-url"

async function getExerciseByCategory(category) {
	try {
		const { data } = await axios.get(`${BASE_URL}/exercise/get-by-category?category=` + category)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
async function getExerciseById(id) {
	try {
		const { data } = await axios.get(`${BASE_URL}/exercise/get-by-id/` + id)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
async function addExercise(exercise) {
	try {
		const { data } = await axios.post(`${BASE_URL}/exercise/create`, exercise)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
async function getExercise() {
	try {
		const { data } = await axios.get(`${BASE_URL}/exercise/get-all`)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
async function deleteExercise(idExercise) {
	try {
		const { data } = await axios.delete(`${BASE_URL}/exercise/delete/` + idExercise)
		if (!data) throw new Error()
		return data.data
	} catch (error) {
		return null
	}
}
export {
	addExercise,
	getExerciseByCategory,
	getExerciseById,
	getExercise
}