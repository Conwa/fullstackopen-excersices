/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { initializeBlogs } from "../reducers/blogSlice";
import { exitLogin } from "../reducers/userSlice";
import { initalizeAuthors } from "../reducers/blogAuthorsSlice";

import Blog from "./Blog";
import BlogList from "./BlogList";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import Users from "./Users";

const LoggedView = (props) => {
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(initializeBlogs());
    dispacth(initalizeAuthors());
  }, [dispacth]);

  const blogs = useSelector((state) => state.blogs);

  const style = {
    backgroundColor: "lightGrey",
    display: "flex",
    margin: "0px",
    gap: "1rem",
    alignItems: "center",
  };

  return (
    <>
      <h2>Blog App</h2>
      <>
        {" "}
        <div>
          {" "}
          <div style={style}>
            <Link to={"/users"}>Users</Link>
            <Link to={"/"}>Blogs</Link>
            <h3>{props.user.name} logged in</h3>
            <button
              onClick={() => {
                dispacth(exitLogin());
              }}
            >
              log out
            </button>
          </div>
        </div>
        <Routes>
          {" "}
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<BlogList />} />
        </Routes>
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
