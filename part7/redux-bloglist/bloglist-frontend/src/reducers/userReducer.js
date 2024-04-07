import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import { setSuccessNotification } from "./notificationReducer";
const userSlice = createSlice({
    name: 'users',
    initialState: null,
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        appendUser(state, action) {
            return state.concat(action.payload)
        }
    }
})

export const { setUsers, appendUser } = userSlice.actions

export const initializeAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}
export const createUser = (newUserObject) => {
    return async dispatch => {
        const newUser = await userService.create(newUserObject)
        console.log(newUser)
        dispatch(appendUser(newUser))
        dispatch(setSuccessNotification('User Account Creation Successfull!Login with your Username and Password', 5))
    }
}

export default userSlice.reducer