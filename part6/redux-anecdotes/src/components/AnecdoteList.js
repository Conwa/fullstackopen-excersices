import { useDispatch, useSelector } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
  };

  return (
    <>
      <h2>Anecdotes</h2>
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

export default Anecdotes;
