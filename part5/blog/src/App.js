import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      console.log(user);
      setPassword("");
      setUsername("");
      // window.localStorage.setItem("name", "juha tauriainen");
    } catch (error) {
      console.log(error);
    }
  };

  const loginView = () => (
    <>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const loggedView = () => (
    <>
      {" "}
      <h2>BLOGS</h2>
      <>
        {" "}
        <h3>{user.name} logged in</h3>
        <button
          onClick={() => {
            console.log(window.localStorage.getItem("name"));
          }}
        >
          log out
        </button>
      </>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  return <div>{user === null ? loginView() : loggedView()}</div>;
};

export default App;
