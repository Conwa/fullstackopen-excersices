import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ blog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const submitBlog = (event) => {
    event.preventDefault();
    const blog = { title: title, author: author, url: url };
    console.log(blog);

    blogService.create(blog).then((returnedBlog) => {
      // setNotes(notes.concat(returnedNote));
      setAuthor("");
      setTitle("");
      setUrl("");
    });
  };

  return (
    <>
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
