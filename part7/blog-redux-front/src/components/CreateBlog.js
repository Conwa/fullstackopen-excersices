import { useState } from "react";
import { useDispatch } from "react-redux";

import blogService from "../services/blogs";

import { setNotification } from "../reducers/notificationSlice";

import Notification from "./Notification";

const CreateBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const submitBlog = async (event) => {
    event.preventDefault();
    const submittedBlog = { title: title, author: author, url: url };

    try {
      const addedBlog = await blogService.create(submittedBlog);
      props.setBlogs(props.blogs.concat(addedBlog));
      setAuthor("");
      setTitle("");
      setUrl("");
      setError(false);

      dispatch(setNotification(`a new blog "${title}" was succesfully added`));

      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);
    } catch (error) {
      setError(true);
      const errorMessage = error.response.data.error;
      console.log(errorMessage);

      dispatch(setNotification(errorMessage));
      setTimeout(() => {
        dispatch(setNotification(null));

        dispatch(setNotification(null));
        setError(false);
      }, 5000);
    }
  };

  return (
    <>
      <Notification error={error} />
      <h2>create new</h2>
      <form id="form" onSubmit={submitBlog}>
        <div>
          title:
          <input
            id="title-input"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            id="author-input"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            id="url-input"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button id="submit-button" type="submit">
          submit blog
        </button>
      </form>
    </>
  );
};

export default CreateBlog;
