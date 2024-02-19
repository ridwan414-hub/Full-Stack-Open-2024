import { useState } from 'react';

const StatisticLine = (props) => {
  // console.log(props);
  const { text, value } = props;

  if (text == 'positive') {
    return (
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value} % </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value} </td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = (props) => {
  const { goodData, neutralData, badData } = props;

  const all = goodData + neutralData + badData;
  const average = (goodData - badData) / all;
  const positive = (100 * goodData) / all;

  if (goodData !== 0 || neutralData !== 0 || badData !== 0) {
    return (
      <div>
        <StatisticLine text="good" value={goodData} />
        <StatisticLine text="neutral" value={neutralData} />
        <StatisticLine text="bad" value={badData} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </div>
    );
  } else
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  // const [totalComment, setTotalComment] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button
        text="neutral"
        handleClick={() => setNeutral(neutral + 1)}
      ></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <h1>Statistics</h1>
      <Statistics
        goodData={good}
        neutralData={neutral}
        badData={bad}
      ></Statistics>
    </>
  );
};

export default App;
