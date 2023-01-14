import { useState } from "react";

const Blog = ({ handleSumLikes, blog }) => {
  const [detailed, setDetailed] = useState(false);
  // const [targetBlog, setTargetBlog] = useState("");

  const toggleVisibility = () => {
    setDetailed(!detailed);
  };

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    handleSumLikes(updatedBlog);
  };

  const handleDelete = () => {
    // deleteBlog(blog.id)
    console.log(blog.id);
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
      <div>
        <button onClick={handleDelete}>remove blog</button>
      </div>
    </div>
  );
};

export default Blog;
