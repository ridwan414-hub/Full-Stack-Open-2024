import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlogs(state, action) {
            state.push(action.payload)
        },
        deletingBlog(state, action) {
            state.filter((blog) => blog.id !== action.payload.id)
        },
        likingBlog(state, action) { 
            const id = action.payload.id
            const blogToChange = state.find(blog => blog.id === id)
            const likedBlog = {
                ...blogToChange,
                votes: blogToChange.likes + 1
            }
            return state.map(blog =>
                blog.id !== id ? blog : likedBlog
            )
        }


    }
})

export const { setBlogs, appendBlogs,likingBlog,deletingBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}
export const createBlog = (newBlog) => { 
    return async dispatch => {
        const createdBlog = await blogService.create(newBlog)
        dispatch(appendBlogs(createdBlog))
    }
}
export const likeBlogs = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(blog)
        dispatch(likingBlog(updatedBlog))
    }
}
export const deleteBlog = (blog) => {
    return async dispatch => { 
        const deletedBlog = await blogService.remove(blog.id)
        console.log(deletedBlog)
        dispatch(deletingBlog(deletedBlog))
    }
}

export default blogSlice.reducer