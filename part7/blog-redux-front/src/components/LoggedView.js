/* eslint-disable no-unused-vars */
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initializeBlogs } from "../reducers/blogSlice";
import { exitLogin } from "../reducers/userSlice";

const LoggedView = (props) => {
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(initializeBlogs());
    console.log("blogs setted");
  }, [dispacth]);

  const blogs = useSelector((state) => state.blogs);

  console.log("logged view repainted");

  return (
    <>
      <h2>BLOGS</h2>
      <>
        <h3>{props.user.name} logged in</h3>
        <button
          onClick={() => {
            dispacth(exitLogin());
          }}
        >
          log out
        </button>
        <Togglable buttonLabel="Open Blog Creator">
          {" "}
          <CreateBlog />
        </Togglable>
      </>
      {[...blogs]
        .sort((prevBlog, nextBlog) => nextBlog.likes - prevBlog.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleSumLikes={props.handleSumLikes}
            handleDelete={props.handleDelete}
            user={props.user}
          />
        ))}
    </>
  );
};

export default LoggedView;
