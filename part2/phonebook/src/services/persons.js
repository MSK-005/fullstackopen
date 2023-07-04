import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const createData = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const updateData = (newObject) => {
    return axios.put(`${baseUrl}/${newObject.id}`, newObject)
}

const deleteData = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, createData, updateData, deleteData}