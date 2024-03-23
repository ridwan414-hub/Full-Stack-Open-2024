import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        blogService.setToken(user.token);
      }
    }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
            window.localStorage.setItem(
              'loggedNoteappUser',
              JSON.stringify(user)
      ); 
      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear();
    setUser(null)
  }

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification errorMessage={errorMessage}></Notification>
        <LoginForm
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
          user={user}
          password={password}
        ></LoginForm>
      </>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      ></Notification>
      <p>
        {user.username} logged in{' '}
        <button onClick={handleLogout} type="submit">
          logout
        </button>
      </p>
      <h2>create new</h2>
      <BlogForm
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
        blogs={blogs}
        setBlogs={setBlogs}
      ></BlogForm>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
