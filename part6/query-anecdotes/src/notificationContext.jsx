/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
const notificationReducer = (state, action) => { 
    switch (action.type) {
        case "showNotification":
            return action.payload
        case "hideNotification":
            return ''
        default:
            return state
     }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
    const [notification, notificationDispatcher] = useReducer(notificationReducer, '')
    return (
        <NotificationContext.Provider value={[notification, notificationDispatcher]}>
            {props.children}
        </NotificationContext.Provider> 
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext