import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
// eslint-disable-next-line react/display-name
const Blog = ({ handleDelete, handleSumLikes, blog, user }) => {
  Blog.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleSumLikes: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  const [detailed, setDetailed] = useState(false);
  const [isOwner, setOwner] = useState(false);

  useEffect(() => {
    if (blog.user.username === user.username) {
      setOwner(true);
    }

    //blog.user.username evaulates to false initially, that
    //is the problem
    //console.log(blog.user.username, user.username, blog.title);
  }, []);
  const toggleVisibility = () => {
    setDetailed(!detailed);
  };

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    handleSumLikes(updatedBlog);
  };

  const deleteBlog = () => {
    handleDelete(blog);
  };

  if (blog === null) {
    return null;
  }

  if (detailed === false) {
    return (
      <div className="minifiedVersion blog px-4 flex flex-row justify-between items-center py-2.5 font-medium bg-blue-50  rounded-lg text-sm my-4 w-full">
        <Link to={`/blogs/${blog.id}`}>
          <div className="flex flex-col">
            {" "}
            <p>{blog.title}</p>
            <p className="underline decoration-solid"> {blog.author}</p>
          </div>
        </Link>

        <button
          type="button"
          className="px-5 py-2.5 font-medium bg-blue-500 hover:bg-blue-100 hover:text-blue-600 text-blue-50 rounded-lg text-sm"
          onClick={toggleVisibility}
        >
          Show Details
        </button>
      </div>
    );
  }
  return (
    <div className="maxifiedVersion blog px-4 flex flex-row justify-between items-center py-2.5 font-medium bg-blue-50  rounded-lg text-sm my-4 w-full">
      <div className="cursor-default">
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>

        <div className="flex flex-row gap-2">
          <p> Likes: {blog.likes}</p>

          <button
            type="button"
            className="px-2  font-medium bg-blue-500 hover:bg-blue-100 hover:text-blue-600 text-blue-50 rounded-lg text-sm"
            onClick={handleLikes}
          >
            Increase likes
          </button>
        </div>
        <p>Url: {blog.url}</p>

        <div>
          {isOwner && <button onClick={deleteBlog}>remove blog</button>}
        </div>
      </div>

      <button
        type="button"
        className="px-5 py-2.5 font-medium bg-blue-500 hover:bg-blue-100 hover:text-blue-600 text-blue-50 rounded-lg text-sm"
        onClick={toggleVisibility}
      >
        minimize
      </button>
    </div>
  );
};

export default Blog;
