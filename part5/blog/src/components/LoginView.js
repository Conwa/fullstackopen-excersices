const LoginView = (props) => (
  <>
    <h2>login to application</h2>
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          id="username-input"
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password-input"
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  </>
);

export default LoginView;
