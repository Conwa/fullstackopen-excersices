import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticsLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  );
};

const Statistics = (props) => {
  if (props.totalReviews === 0) {
    return (
      <div>
        <p>No Feedback Yet!</p>
      </div>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <StatisticsLine text="Good: " value={props.good} />
        <StatisticsLine text="Neutral: " value={props.neutral} />
        <StatisticsLine text="Bad: " value={props.bad} />
        <StatisticsLine text="Total: " value={props.total} />
        <StatisticsLine text="Average: " value={props.average} />
        <StatisticsLine text="% of Good Reviews: " value={props.percentage} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);

  const totalReviews = good + neutral + bad;
  const averageReviews = parseFloat(average / totalReviews).toFixed(3);
  const percentage = Math.floor(100 * good) / totalReviews + "%";
  return (
    <>
      <div>
        <h1>Share with us your Feedback!!</h1>
        <Button
          text="good"
          handleClick={() => {
            setGood(good + 1);
            setAverage(average + 1);
          }}
        />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button
          text="bad"
          handleClick={() => {
            setBad(bad + 1);
            setAverage(average - 1);
          }}
        />
      </div>
      <>
        <div>
          <h1>Statistics</h1>
          <Statistics
            totalReviews={totalReviews}
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalReviews}
            average={averageReviews}
            percentage={percentage}
          />
        </div>
      </>
    </>
  );
};

export default App;

/*
APP STATICS WITHOUT TABLE
<div>
          <h1>Statistics</h1>
          <Statistics
            totalReviews={totalReviews}
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalReviews}
            average={averageReviews}
            percentage={percentage}
          />
        </div>
        
STATISTICS WITHOUT TABLE
        <div>
      <StatisticsLine text="Good: " value={props.good} />
      <StatisticsLine text="Neutral: " value={props.neutral} />
      <StatisticsLine text="Bad: " value={props.bad} />
      <StatisticsLine text="Total: " value={props.total} />
      <StatisticsLine text="Average: " value={props.average} />
      <StatisticsLine text="% of Good Reviews: " value={props.percentage} />
    </div>
         
        */
