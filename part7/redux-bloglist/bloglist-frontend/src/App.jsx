/* eslint-disable linebreak-style */
import { useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import Toggleable from './components/Toggleable';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import Blogs from './components/Blogs';
import { initializeUser, logOut } from './reducers/loginReducer';
import LoginForm from './components/LoginForm';

const App = () => {
  const dispatch = useDispatch();
  const BlogsFormRef = useRef();
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);
  const user = useSelector((state) => state.loggedInUser);
  console.log(user);
  return (
    <div>
      {
        (user===null)
        ? <LoginForm></LoginForm>
        : <h1>{user.username} logged in</h1>
      }
      <button onClick={() => dispatch(logOut())}>logout</button>
      <Toggleable buttonLabel="new note" ref={BlogsFormRef}>
        <BlogForm></BlogForm>
      </Toggleable>

      <Blogs></Blogs>
    </div>
  );
};

export default App;
