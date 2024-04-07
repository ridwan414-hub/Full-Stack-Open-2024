import axios from "axios"
const baseUrl = '/api/users'
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newUserObject) => {
    const response = await axios.post(baseUrl, newUserObject)
    return response.data

}
export default { getAll, create } 