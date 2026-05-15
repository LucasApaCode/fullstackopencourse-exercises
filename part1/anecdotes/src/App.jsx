import { useState } from "react";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const votes = [0, 0, 0, 0, 0, 0, 0, 0];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(votes);
  const [mostVote, setMostVote] = useState(0);

  const handleVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);

    const max = Math.max(...copy);
    const i = copy.indexOf(max);
    setMostVote(i);
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <div>{anecdotes[selected]}</div>
        <div>has {vote[selected]} votes</div>
        <button onClick={handleVote}>vote</button>
        <button
          onClick={() => {
            setSelected(Math.floor(Math.random() * anecdotes.length));
          }}
        >
          next anecdote
        </button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <div>{anecdotes[mostVote]}</div>
        <div>has {vote[mostVote]}</div>
      </div>
    </div>
  );
}

export default App;
