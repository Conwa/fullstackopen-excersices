import { useDispatch } from "react-redux";

import { newAnecdote } from "../reducers/anecdoteReducer";
import {
  deleteNotification,
  newAnecdoteNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const text = event.target.anecdote.value;
    // console.log(text);
    dispatch(newAnecdote(text));
    dispatch(newAnecdoteNotification(event.target.anecdote.value));
    event.target.anecdote.value = "";

    setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
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
