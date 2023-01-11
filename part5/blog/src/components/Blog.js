import { useState } from "react";

const Blog = ({ blog }) => {
  const [detailed, setDetailed] = useState(false);

  // const hideWhenVisible = { display: visible ? "none" : "" };
  // const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setDetailed(!detailed);
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
        <button>increase likes</button>
      </div>
      <div>Url: {blog.url}</div>
    </div>
  );
};

export default Blog;
