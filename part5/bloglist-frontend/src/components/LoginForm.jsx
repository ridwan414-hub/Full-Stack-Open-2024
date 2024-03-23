import React from 'react';

function LoginForm(props) {
    const {setPassword,setUsername,handleLogin,username,password} = props;
    return (
      <div>
        <div>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                name="Username"
                value={username}
                onChange={({ target }) => {
                  setUsername(target.value);
                }}
              />
            </div>
            <div>
              password
              <input
                type="password"
                name="Password"
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
}

export default LoginForm;