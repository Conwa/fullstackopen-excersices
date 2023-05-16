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

  return (
    <div className="container max-w-full">
      <div className="container mx-auto pt-4 flex justify-center">
        <h2 className="font-bold text-5xl leading-loose text-blue-500 cursor-default">
          Blog App
        </h2>
      </div>

      <>
        {" "}
        <div className="container mx-auto flex justify-between px-4 py-4 bg-indigo-400 rounded-lg">
          <div className="flex flex-row gap-3 items-center">
            {" "}
            <Link to={"/users"}>
              <a
                href="#_"
                className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 rounded-lg text-sm"
              >
                Users
              </a>
            </Link>
            <Link to={"/"}>
              <a
                href="#_"
                className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 rounded-lg text-sm"
              >
                Blogs
              </a>
            </Link>
          </div>
          <div className="flex flex-row gap-3 items-center">
            {" "}
            <h3 className="px-5 py-2.5 font-medium bg-blue-500  text-blue-50 rounded-lg text-sm cursor-default">
              {props.user.name} logged in
            </h3>
            <button
              type="button"
              className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 rounded-lg text-sm"
              onClick={() => {
                dispacth(exitLogin());
              }}
            >
              Log Out
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
    </div>
  );
};

export default LoggedView;
