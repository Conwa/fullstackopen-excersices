import { useDispatch, useSelector } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  deleteNotification,
  voteAnecdoteNotification,
} from "../reducers/notificationReducer";

import anecdoteService from "../services/anecdotes";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdote, filter }) => {
    if (filter.value === "ALL") {
      return anecdote;
    }
    const filteredAnecdotes = anecdote.filter(
      (anecdote) =>
        anecdote.content.toLowerCase().indexOf(filter.value.toLowerCase()) !==
        -1
    );
    return filteredAnecdotes;
  });

  const voteAction = (anecdote) => {
    var clickTimeout;
    dispatch(voteAnecdote(anecdote.id));
    dispatch(voteAnecdoteNotification(anecdote.content));

    anecdoteService.vote(anecdote.id);

    clearTimeout(clickTimeout);

    clickTimeout = setTimeout(function () {
      dispatch(deleteNotification());
    }, 5000);
  };

  const dispatch = useDispatch();

  return (
    <>
      {[...anecdotes]
        .sort((anecdote, prevAnecdote) => {
          return prevAnecdote.votes - anecdote.votes;
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteAction(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
