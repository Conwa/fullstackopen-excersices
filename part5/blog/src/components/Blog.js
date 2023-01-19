import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  if (detailed === false) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>show details</button>{" "}
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      <div>
        Title: {blog.title} <button onClick={toggleVisibility}>minimize</button>
      </div>
      <div>Author: {blog.author}</div>
      <div>
        Likes: {blog.likes}
        <button onClick={handleLikes}>increase likes</button>
      </div>
      <div>Url: {blog.url}</div>
      <div>{isOwner && <button onClick={deleteBlog}>remove blog</button>}</div>
    </div>
  );
};

export default Blog;
