const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        For more info visit: <a href="#">{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
