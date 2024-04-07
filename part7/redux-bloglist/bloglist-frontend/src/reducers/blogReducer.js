import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setSuccessNotification } from "./notificationReducer";
const blogSlice = createSlice({
    name: 'blogs',
    initialState: null,
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlogs(state, action) {
            state.push(action.payload)
        },
        deletingBlog(state, action) {
            const newState = state.filter((blog) => blog.id !== action.payload)
            return newState
        },
        likingBlog(state, action) {
            const id = action.payload.id
            const likedBlog = action.payload
            return state.map(blog =>
                blog.id !== id ? blog : likedBlog
            )
        }


    }
})

export const { setBlogs, appendBlogs, likingBlog, deletingBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}
export const createBlog = (newBlog) => {
    return async dispatch => {
        try {
            const createdBlog = await blogService.create(newBlog)
            dispatch(appendBlogs(createdBlog))
            dispatch(setSuccessNotification('your Created the blog', 2))
        } catch (err) { 
            console.error(err)
            dispatch(setSuccessNotification('To create blog Log in first', 5))
        }
    }
}
export const likeBlogs = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(blog)
        console.log(updatedBlog)
        dispatch(likingBlog(updatedBlog))
        dispatch(setSuccessNotification('your liked the blog', 2))
    }
}
export const deleteBlog = (blog) => {
    return async dispatch => {
        try {
            await blogService.remove(blog.id)
            dispatch(deletingBlog(blog.id))
        } catch (error) {
            console.log(error)
        }
    }
}

export default blogSlice.reducer