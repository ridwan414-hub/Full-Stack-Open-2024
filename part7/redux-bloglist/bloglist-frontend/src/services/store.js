import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../reducers/blogReducer";
import loginReducer from "../reducers/loginReducer";
import userReducer from "../reducers/userReducer";
import commentReducer from "../reducers/commentReducer";
import notificationReducer from "../reducers/notificationReducer";

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        loggedInUser: loginReducer,
        allUsers: userReducer,
        comments: commentReducer,
        notification:notificationReducer
    },
});
store.subscribe(() => {
    console.log(store.getState());
});

export default store;