import { useDispatch } from "react-redux";

import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispacth = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const text = event.target.anecdote.value;

    dispacth(createNewAnecdote(text));
    dispacth(newNotification(`You created the blog ${text}!`, 2000));

    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
