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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
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
