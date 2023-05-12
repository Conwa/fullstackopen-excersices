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
        <h3>Comments:</h3>{" "}
        {blog.comments.lenght !== 0 ? (
          blog.comments.map((el) => {
            console.log(el);
          })
        ) : (
          <p>s</p>
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
