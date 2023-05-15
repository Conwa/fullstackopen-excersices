import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

import { Link } from "react-router-dom";

const BlogList = ({ blogs, handleSumLikes, handleDelete, user }) => {
  if (blogs === undefined || blogs.lenght === 0) {
    return null;
  }

  return (
    <>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Open Blog Creator">
        {" "}
        <CreateBlog />
      </Togglable>
      {[...blogs]
        .sort((prevBlog, nextBlog) => nextBlog.likes - prevBlog.likes)
        .map((blog) => (
          <>
            <Link to={`/blogs/${blog.id}`}>
              {" "}
              <Blog
                key={blog.id}
                blog={blog}
                handleSumLikes={handleSumLikes}
                handleDelete={handleDelete}
                user={user}
              />
            </Link>
          </>
        ))}
    </>
  );
};

export default BlogList;
