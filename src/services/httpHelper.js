import axios from 'axios'

const defaultConfig = {
	headers: {
		'Content-Type': 'application/json',
	}
}

const getAll = async (url) => {
	const response = await axios.get(url)
	return response
}

const create = async (url, newObject) => {
	const response = await axios.post(url, JSON.stringify(newObject), defaultConfig)
	return response
}

const update = async (url, newObject) => {
	const response = await axios.put(url, newObject, defaultConfig)
	return response
}

const remove = async (url) => {
	const response = await axios.delete(url, defaultConfig)
	return response
}

export default {
	getAll,
	create,
	update,
	remove
}