const LoginView = (props) => (
  <div className="grid h-screen place-items-center">
    <form
      className="px-5 py-2.5 font-medium bg-indigo-300 rounded-lg text-sm my-4 w-1/2 lg:w-1/3 "
      onSubmit={props.handleLogin}
    >
      <h2 className="font-medium cursor-default text-lg mb-4 border-b-2 border-b-gray-500 text-center">
        Login to application
      </h2>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-fit w-5/6">
          <label className="block font-bold md:text-left mb-1 md:mb-0 pr-4">
            Username:
          </label>
        </div>
        <div className="md:w-4/6 grow">
          <input
            className="appearance-none border-2 border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-indigo-400"
            id="username-input"
            type="text"
            value={props.username}
            name="Username"
            placeholder="root"
            onChange={({ target }) => props.setUsername(target.value)}
          ></input>
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-fit w-5/6">
          <label className="block font-bold md:text-left mb-1 md:mb-0 pr-4">
            Password:
          </label>
        </div>
        <div className="md:w-4/6 grow">
          <input
            className="appearance-none border-2 border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-indigo-400"
            id="password-input"
            type="password"
            value={props.password}
            name="Password"
            placeholder="12345"
            onChange={({ target }) => props.setPassword(target.value)}
          ></input>
        </div>
      </div>
      <div className="flex items-center justify-center mb-3">
        <button
          id="login-button"
          type="submit"
          className=" py-2 w-4/6 font-medium bg-blue-500 hover:bg-blue-100 hover:text-blue-600 text-blue-50 rounded-lg text-base"
        >
          LOGIN
        </button>
      </div>
    </form>
  </div>
);

export default LoginView;
