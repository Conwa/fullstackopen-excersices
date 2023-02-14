import { useEffect, useState } from "react";

// import Blog from "./components/Blog";
// import CreateBlog from "./components/CreateBlog";
import LoggedView from "./components/LoggedView";
import LoginView from "./components/LoginView";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  //didn´t know if the sorting had to be done by most to least likes
  //or viceversa
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(
          [...blogs].sort(
            (prevBlog, nextBlog) => prevBlog.likes - nextBlog.likes
          )
        )
      );
  }, []);

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

  const handleSumLikes = async (blogObject) => {
    const updatedBLog = await blogService.update(blogObject);
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBLog.id ? updatedBLog : blog))
    );
  };

  //MISSING FEATURE
  //Show the button for deleting a blog post only if the blog post was added by the user.

  const handleDelete = async (blogObject) => {
    const message = `Delete ${blogObject.title} by ${blogObject.author}?`;

    if (window.confirm(message)) {
      await blogService.deletion(blogObject);

      const filteredBlogs = blogs.filter((blog) => blog.id !== blogObject.id);
      setBlogs(filteredBlogs);
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
          blogs={blogs}
          setBlogs={setBlogs}
          handleSumLikes={handleSumLikes}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
