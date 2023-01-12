import { useState, useEffect } from "react";

// import Blog from "./components/Blog";
// import CreateBlog from "./components/CreateBlog";
import LoginView from "./components/LoginView";
import LoggedView from "./components/LoggedView";

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      // console.log(user);
      setPassword("");
      setUsername("");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumLikes = async (blogObject) => {
    blogService.update(blogObject);
  };

  return (
    <div>
      {user === null ? (
        <LoginView
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <LoggedView
          user={user}
          setUser={setUser}
          blogs={blogs}
          setBlogs={setBlogs}
          handleSumLikes={handleSumLikes}
        />
      )}
    </div>
  );
};

export default App;
