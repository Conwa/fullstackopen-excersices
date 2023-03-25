import { useDispatch, useSelector } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdote, filter }) => {
    if (filter === "ALL") {
      return anecdote;
    }
    const filteredAnecdotes = anecdote.filter(
      (anecdote) =>
        anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
    return filteredAnecdotes;
  });

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
              <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
