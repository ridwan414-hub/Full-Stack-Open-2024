import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/loginReducer';
import { initializeBlogs } from '../reducers/blogReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.U.value;
    const password = e.target.P.value;
    dispatch(logIn(username, password));
    dispatch(initializeBlogs())
    e.target.U.value = '';
    e.target.P.value = '';
  };
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="U" />
        </div>
        <div>
          password
          <input type="password" name="P" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
