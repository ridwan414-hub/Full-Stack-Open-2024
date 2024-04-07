import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        showSuccessNotification(state, action) {
            return (action.payload)
        },
        showErrorNotification(state, action) {
            return (action.payload)
        },
        hideNotification() {
            return ''
        }
    }
})

export const { showSuccessNotification,showErrorNotification, hideNotification } = notificationSlice.actions

export const setSuccessNotification = (text, timeout) => {
    return dispatch => {
        dispatch(showSuccessNotification(text))
        setTimeout(() => {
            dispatch(hideNotification())
        }, timeout * 1000)
    }
}
export const setErrorNotification = (text, timeout) => {
    return dispatch => {
        dispatch(showErrorNotification(text))
        setTimeout(() => {
            dispatch(hideNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer