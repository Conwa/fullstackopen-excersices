import { useNavigate } from "react-router-dom";

import { useField } from "../hooks";

const CreateNew = (props) => {
  const navigate = useNavigate();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
    props.setNotification(content.value);
    setTimeout(() => {
      props.setNotification("");
    }, 5000);
  };

  const handleReset = (event) => {
    const contentReset = content.onReset();
    const authorReset = author.onReset();
    const infoReset = info.onReset();
    return { contentReset, authorReset, infoReset };
  };

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
        <div></div>
        <button type="button" onClick={handleReset}>
          erase info
        </button>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateNew;
