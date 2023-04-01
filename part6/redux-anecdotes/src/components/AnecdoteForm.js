import { useDispatch } from "react-redux";

import { newAnecdote } from "../reducers/anecdoteReducer";
import {
  deleteNotification,
  newAnecdoteNotification,
} from "../reducers/notificationReducer";

import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const text = event.target.anecdote.value;

    anecdoteService
      .createNew(text)
      .then(dispatch(newAnecdote(text)))
      .then(dispatch(newAnecdoteNotification(text)));

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
