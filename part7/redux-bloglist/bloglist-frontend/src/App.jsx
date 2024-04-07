/* eslint-disable linebreak-style */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeAllUsers } from './reducers/userReducer';
import { initializeLoggedInUser } from './reducers/loginReducer';
import Menu from './components/Menu';
import Users from './components/Users';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import UserBloglist from './components/UserBloglist';
import BlogDetails from './components/BlogDetails';
import Notification from './components/Notification';
import { Page } from './styleRoom/style';
import Container from 'react-bootstrap/Container';
import SignUpForm from './components/SignUpForm';
// import Menu2 from './components/Menu2';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeLoggedInUser());
    dispatch(initializeAllUsers());
  }, [dispatch]);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  return (
    <Page>
      <Notification />
      <Container>
        <Menu />
        {/* <Menu2/> */}
        <Routes>
          <Route path="/" element={<Blogs />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/blogs/:id" element={<BlogDetails />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:id" element={<UserBloglist />}></Route>
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route
            path="/login"
            element={
              loggedInUser === null ? (
                <LoginForm />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
        </Routes>
      </Container>
    </Page>
  );
};

export default App;
