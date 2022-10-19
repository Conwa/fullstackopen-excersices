import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  function incrementVote() {
    const copy = { ...points };
    copy[selected] += 1;
    setPoints(copy);
    console.log(copy);
  }

  const MostVoted = (props) => {
    const hola = Object.keys(points).reduce(function (a, b) {
      return points[a] > points[b] ? a : b;
    });
    if (points[hola] === 0) {
      return <p>No anecdotes voted yet!</p>;
    }
    return (
      <p>
        {anecdotes[hola]} {points[hola]} {props.text}
      </p>
    );
  };

  return (
    <>
      <>
        <div>
          <h1>Anecdote of the Day</h1>
          {anecdotes[selected]} {points[selected]} {"votes"}
        </div>
        <Button
          onClick={() =>
            setSelected(Math.floor(Math.random() * anecdotes.length))
          }
          text="Another Anecdote"
        />
        <Button onClick={() => incrementVote()} text="Vote your favourite" />
      </>
      <>
        <h1>Most voted Anecdote</h1>
        <MostVoted text="Votes" />
      </>
    </>
  );
};

export default App;
