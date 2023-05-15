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
    <>
      <h2>{blog.title} </h2>
      <>
        <a href="#"> {blog.url} </a>
        <>
          <p>
            {" "}
            {blog.likes} likes
            <button onClick={handleLikes}>like blog</button>{" "}
          </p>
        </>
        <>
          {" "}
          <p>Created by: {blog.author} </p>{" "}
        </>
      </>
      <>
        {" "}
        <h3 className="text-3xl font-bold underline">Comments:</h3>{" "}
        {blog.comments.length !== 0 ? (
          <ul>
            {blog.comments.map((el) => (
              <li key={blog.id}> {el} </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontWeight: "bold" }}>No comments added yet!</p>
        )}
        <input
          type="text"
          placeholder="Add comment here"
          id="commentValue"
        ></input>
        <button onClick={handleNewComment}>Add</button>{" "}
      </>
    </>
  );
};

export default BlogView;
