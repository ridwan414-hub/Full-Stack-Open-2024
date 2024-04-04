/* eslint-disable linebreak-style */
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import { Provider } from 'react-redux';
import loginReducer from './reducers/loginReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    loggedInUser: loginReducer,
  },
});
store.subscribe(() => {
  console.log(store.getState());
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
