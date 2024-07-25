import { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(8).fill(0));

  const maxValue = Math.max(...vote); // Find the maximum value in the array
  const maxIndex = vote.findIndex((element) => element === maxValue); // Find the index of the maximum value

  console.log(maxIndex);
  const handleVote = () => {
    const newTotalVotes = [...vote];
    newTotalVotes[selected] += 1;
    setVote(newTotalVotes);

    console.log(newTotalVotes, sum);
    console.log('vote added to the ancedotes Index number', selected);
  };

  //sum of the array of votes
  let sum = 0;
  vote.forEach((vote) => (sum += vote));

  const handleNext = () => {
    const anecdotesIndex = Math.floor(Math.random() * 8);
    setSelected(anecdotesIndex);
  };

  return (
    <>
      <h1>Anecdotes Of The Day</h1>
      <h2>{anecdotes[selected]}</h2>
      <h4>you have {7 - sum} votes</h4>
      <Button onClick={handleNext} text="Next anecdotes"></Button>
      {sum < 7 && <Button onClick={handleVote} text="Vote"></Button>}
      <h1>Ancedote With Most Vote</h1>
      <h2>{anecdotes[maxIndex]}</h2>
    </>
  );
};

export default App;
