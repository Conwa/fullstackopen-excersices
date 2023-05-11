import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useMatch } from "react-router-dom";

import { initalizeAuthors } from "../reducers/blogAuthorsSlice";
import { initializeBlogs } from "../reducers/blogSlice";
import { exitLogin } from "../reducers/userSlice";

import BlogList from "./BlogList";
import BlogView from "./BlogView";
import User from "./User";
import Users from "./Users";

const LoggedView = (props) => {
  const dispacth = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const authors = useSelector((state) => state.authors);

  const authorMatcher = useMatch("/users/:id");
  const authorMatch = authorMatcher
    ? authors.find((author) => author.id === authorMatcher.params.id)
    : null;

  const blogMatcher = useMatch("/blogs/:id");
  const blogMatch = blogMatcher
    ? blogs.find((blog) => blog.id === blogMatcher.params.id)
    : null;

  useEffect(() => {
    dispacth(initializeBlogs());
    dispacth(initalizeAuthors());
  }, [dispacth]);

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
          <Route
            path="/"
            element={
              <BlogList
                blogs={blogs}
                handleSumLikes={props.handleSumLikes}
                handleDelete={props.handleDelete}
                user={props.user}
              />
            }
          />
          <Route path="/users/:id" element={<User author={authorMatch} />} />
          <Route
            path="/blogs/:id"
            element={
              <BlogView
                blog={blogMatch}
                handleSumLikes={props.handleSumLikes}
                user={props.user}
              />
            }
          />
        </Routes>
      </>
    </>
  );
};

export default LoggedView;
