import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setSuccessNotification } from "./notificationReducer";
const loginSlice = createSlice({
    name: 'loggedInUser',
    initialState: null,
    reducers: {
        setLoggedInUser(state, action) {
            return action.payload
        },
        initUser(state, action) {
            return action.payload
        },
        logOutUser() {
            return null
        }
    }
})

export const { setLoggedInUser, initUser, logOutUser } = loginSlice.actions

export const logIn = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username,
            password,
        })
        console.log(user)
        window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setLoggedInUser(user))

        dispatch(setSuccessNotification('successfull log in', 2))
    }
}

export const initializeLoggedInUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(initUser(user))
            blogService.setToken(user.token)
        }
    }
}

export const logOut = () => {
    return async dispatch => {
        localStorage.clear()
        dispatch(logOutUser())

        dispatch(setSuccessNotification('your logged out', 2))
    }
}

export default loginSlice.reducer
