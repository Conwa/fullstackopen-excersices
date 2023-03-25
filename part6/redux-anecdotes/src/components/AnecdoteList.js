import { useDispatch, useSelector } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  // const anecdotes = useSelector((state) => state.anecdote);

  const anecdotes = useSelector((state) => {
    console.log(state);
    return state.anecdote;
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
