import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
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

  // const createBlog = async (BlogToAdd) => {
  //   try {
  //     blogFormRef.current.toggleVisibility()
  //     const createdBlog = await blogService
  //       .create(BlogToAdd)
  //     setSuccessMessage(
  //       `Blog ${BlogToAdd.title} was successfully added`
  //     )
  //     setAllBlogs(allBlogs.concat(createdBlog))
  //     setErrorMessage(null)
  //     setTimeout(() => {
  //       setSuccessMessage(null)
  //     }, 5000)
  //   } catch(exception) {
  //     setErrorMessage(
  //       `Cannot add blog ${BlogToAdd.title}`
  //     )
  //     setSuccessMessage(null)
  //     setTimeout(() => {
  //       setSuccessMessage(null)
  //     }, 5000)
  //   }
  // }

  const loggedView = () => (
    <>
      <h2>BLOGS</h2>
      <>
        <CreateBlog></CreateBlog>
        <h3>{user.name} logged in</h3>
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedUser");
            //setUser to trigger useEffect hook
            setUser(null);
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
        <LoggedView user={user} setUser={setUser} blogs={blogs} />
      )}
    </div>
  );
};

export default App;
