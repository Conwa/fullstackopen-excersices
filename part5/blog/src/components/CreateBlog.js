import { useState } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";

const CreateBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setError] = useState(false);

  const submitBlog = async (event) => {
    event.preventDefault();
    const submittedBlog = { title: title, author: author, url: url };
    blogService.setToken(props.user.token);
    try {
      const addedBlog = await blogService.create(submittedBlog);
      props.setBlogs(props.blogs.concat(addedBlog));
      setAuthor("");
      setTitle("");
      setUrl("");
      setError(!isError);
      setMessage(`a new blog ${title} was succesfully added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setError(!isError);
      console.log(error);

      setMessage(error.response.data);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <Notification message={message} isError={isError} />
      <h2>create new</h2>
      <form onSubmit={submitBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type="submit">submit blog</button>
      </form>
    </>
  );
};

export default CreateBlog;
