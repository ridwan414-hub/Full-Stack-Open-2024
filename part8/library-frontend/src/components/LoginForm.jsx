import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ setError, setToken, setPage, show }) => {
  const [username, setUsername] = useState('Ridwan');
  const [password, setPassword] = useState('password123');
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
      setUsername('');
      setPassword('');
      setPage('authors');
    }
  }, [result.data, setToken, setPage]);

  if (!show) {
    return null;
  }
  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setError: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default LoginForm;
