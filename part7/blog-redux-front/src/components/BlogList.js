import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

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
          <Blog
            key={blog.id}
            blog={blog}
            handleSumLikes={handleSumLikes}
            handleDelete={handleDelete}
            user={user}
          />
        ))}
    </>
  );
};

export default BlogList;
