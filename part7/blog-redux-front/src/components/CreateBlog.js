import { useState } from "react";
import { useDispatch } from "react-redux";

import { createNewBlog } from "../reducers/blogSlice";
import { setNotification } from "../reducers/notificationSlice";

import Notification from "./Notification";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const submitBlog = async (event) => {
    event.preventDefault();
    const submittedBlog = { title: title, author: author, url: url };

    try {
      dispatch(createNewBlog(submittedBlog));

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

      dispatch(setNotification(errorMessage));
      setTimeout(() => {
        dispatch(setNotification(null));

        setError(false);
      }, 5000);
    }
  };

  return (
    <>
      <Notification error={error} />

      <form
        className="px-5 py-2.5 font-medium bg-blue-50  rounded-lg text-sm my-4 w-1/3  max-w-sm"
        id="form"
        onSubmit={submitBlog}
      >
        <h2 className="font-medium cursor-default text-lg mb-4 border-b-2 border-b-gray-500">
          Create New
        </h2>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/6">
            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
              Title:
            </label>
          </div>
          <div className="md:w-5/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-400"
              id="title-input"
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            ></input>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/6">
            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
              Author:
            </label>
          </div>
          <div className="md:w-5/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-400"
              id="author-input"
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            ></input>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/6">
            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
              Url:
            </label>
          </div>
          <div className="md:w-5/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-400"
              id="url-input"
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            ></input>
          </div>
        </div>

        <button
          id="submit-button"
          type="submit"
          className="px-5 py-2.5 font-medium bg-blue-500 text-blue-50 rounded-lg"
        >
          Submit Blog
        </button>
      </form>
    </>
  );
};

export default CreateBlog;
