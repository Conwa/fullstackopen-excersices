import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

const BlogList = ({ blogs, handleSumLikes, handleDelete, user }) => {
  if (blogs === undefined || blogs.lenght === 0) {
    return null;
  }

  return (
    <div className="container mx-auto my-4 bg-indigo-300 px-6 py-2 rounded-lg">
      <div className="flex flex-col py-2 gap-2">
        <h2 className=" font-medium cursor-default text-xl">Blogs</h2>
        <Togglable buttonLabel="Open Blog Creator">
          <CreateBlog />
        </Togglable>
      </div>

      <div className="grid grid-cols-3 py-4 grid-rows-4 gap-6">
        {[...blogs]
          .sort((prevBlog, nextBlog) => nextBlog.likes - prevBlog.likes)
          .map((blog) => (
            // eslint-disable-next-line react/jsx-key
            <div className="flex flex-row">
              <Blog
                key={blog.id}
                blog={blog}
                handleSumLikes={handleSumLikes}
                handleDelete={handleDelete}
                user={user}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogList;
