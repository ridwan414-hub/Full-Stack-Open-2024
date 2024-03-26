/* eslint-disable linebreak-style */
import PropTypes from 'prop-types'
import React from 'react'

function LoginForm({
  setPassword,
  setUsername,
  handleLogin,
  username,
  password }) {
  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <div>
              username
            <input
              id='username'
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </div>
          <div>
              password
            <input
              id='password'
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
          </div>
          <button id='login-button' type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
LoginForm.propTypes = {
  setPassword : PropTypes.func.isRequired,
  setUsername : PropTypes.func.isRequired,
  handleLogin : PropTypes.func.isRequired,
  username : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired
}
export default LoginForm