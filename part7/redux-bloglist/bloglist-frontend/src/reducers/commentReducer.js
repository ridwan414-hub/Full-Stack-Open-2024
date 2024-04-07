import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";
import { setSuccessNotification } from "./notificationReducer";

const commentSlice = createSlice({
    name: 'comments',
    initialState: null,
    reducers: {
        setComments(state, action) {
            return action.payload
        },
        appendComment(state, action) {
            return state.concat(action.payload)
        }
    }
})

export const { setComments, appendComment } = commentSlice.actions

export const getComments = (id) => {
    return async dispatch => {
        const comments = await commentService.getAllComments(id)
        dispatch(setComments(comments))
    }
}
export const addComment = (id, commentObject) => {
    return async dispatch => {
        const newComment = await commentService.createComment(id, commentObject)
        dispatch(appendComment(newComment))
        dispatch(setSuccessNotification('your comment has been added',2))
    }
}
export default commentSlice.reducer
