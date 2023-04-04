import { useDispatch, useSelector } from "react-redux";

import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";

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
    dispatch(voteForAnecdote(anecdote.id));

    dispatch(newNotification(`You voted for ${anecdote.content}`, 2000));
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
