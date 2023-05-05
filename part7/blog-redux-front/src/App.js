import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import LoggedView from "./components/LoggedView";
import LoginView from "./components/LoginView";

import blogService from "./services/blogs";
import loginService from "./services/login";

import {
  deleteTargetBlog,
  initializeBlogs,
  voteForBlog,
} from "./reducers/blogSlice";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(initializeBlogs());
  }, [dispacth]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumLikes = (blogObject) => {
    dispacth(voteForBlog(blogObject));
  };

  const handleDelete = (blogObject) => {
    const message = `Delete ${blogObject.title} by ${blogObject.author}?`;

    if (window.confirm(message)) {
      dispacth(deleteTargetBlog(blogObject));
    }
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
          handleSumLikes={handleSumLikes}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
