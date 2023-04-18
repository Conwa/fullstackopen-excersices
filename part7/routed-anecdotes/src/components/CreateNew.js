import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useField } from "../hooks";

const CreateNew = (props) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addNew({
      content: content.value,
      author,
      info,
      votes: 0,
    });
    props.setNotification(content.value);
    setTimeout(() => {
      props.setNotification("");
    }, 5000);

    navigate("/");
  };

  const content = useField("content");
  const author = useField("author");
  const info = useField("info");

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
