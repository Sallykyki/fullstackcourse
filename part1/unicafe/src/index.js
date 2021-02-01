import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = (props) => {
  const { text, value } = props;
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <p>all {all}</p>
      <p>average {isNaN(average) ? "" : average} </p>
      <p>positive {isNaN(positive) ? "" : `${positive}%`}</p>
    </div>
  );
};

const Button = (props) => {
  const { label, handleClick } = props;
  return <button onClick={handleClick}>{label}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} label="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} label="neutral" />
      <Button handleClick={() => setBad(bad + 1)} label="bad" />
      <h2>statistic</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
