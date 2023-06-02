import { useDispatch } from "react-redux";

import { commentBlog } from "../reducers/blogSlice";

const BlogView = ({ handleSumLikes, blog, user }) => {
  const dispatch = useDispatch();

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    handleSumLikes(updatedBlog);
  };

  const handleNewComment = () => {
    const commentValue = document.querySelector("#commentValue");

    dispatch(commentBlog(blog.id, commentValue.value));

    commentValue.value = "";
  };

  if (blog === undefined || user === undefined) {
    return null;
  }

  return (
    <div className="container mx-auto my-4 bg-indigo-300 px-6 py-2 rounded-lg">
      <div className="px-5 py-2.5 font-medium bg-blue-50 rounded-lg text-sm my-4 w-1/3  max-w-sm cursor-default">
        <h2 className="font-medium text-lg mb-4 border-b-2 border-b-gray-500">
          {blog.title}
        </h2>
        <div className="flex flex-col gap-2">
          <a href="#"> {blog.url} </a>
          <div className="flex flex-row gap-2">
            <p>{blog.likes} likes</p>
            <button
              onClick={handleLikes}
              className="px-2  font-medium bg-blue-500 hover:bg-blue-100 hover:text-blue-600 text-blue-50 rounded-lg text-sm"
            >
              like blog
            </button>
          </div>
          <p>Created by: {blog.author} </p>{" "}
        </div>
        <div className="w-full">
          {" "}
          <h3 className="font-medium mt-5 border-b-2 border-b-gray-500">
            Comments:
          </h3>
          {blog.comments.length !== 0 ? (
            <ul className="list-disc px-5">
              {blog.comments.map((el) => (
                <li key={blog.id}> {el} </li>
              ))}
            </ul>
          ) : (
            <p>No comments added yet!</p>
          )}
        </div>
      </div>

      <>
        <input
          type="text"
          placeholder="Add comment here"
          id="commentValue"
        ></input>
        <button onClick={handleNewComment}>Add</button>{" "}
      </>
    </div>
  );
};

export default BlogView;
