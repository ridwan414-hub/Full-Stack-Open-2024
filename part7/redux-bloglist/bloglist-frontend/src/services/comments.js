import axios from "axios"

const getAllComments = async (id) => {
    const response = await axios.get(`/api/blogs/${id}/comments`)
    return response.data
}
const createComment = async (id, newObject) => {
    const response = await axios.post(`/api/blogs/${id}/comments`, newObject)
    return response.data
}

export default { getAllComments, createComment }