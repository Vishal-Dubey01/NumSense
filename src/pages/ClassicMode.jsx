import { useState, useEffect } from "react";

function ClassicMode({ goBack }) {
  const [playerNames, setPlayerNames] = useState({ 1: "", 2: "" });
  const [nameInputs, setNameInputs] = useState({ 1: "", 2: "" });
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const [target, setTarget] = useState(null);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState({ 1: 0, 2: 0 });
  const [feedback, setFeedback] = useState("");
  const [round, setRound] = useState(1); // Round 1: First player's turn, Round 2: Second player's turn
  const [winner, setWinner] = useState(null);

  // Step 1: Handle name entry
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (nameInputs[1].trim() && nameInputs[2].trim()) {
      setPlayerNames({
        1: nameInputs[1].trim(),
        2: nameInputs[2].trim(),
      });

      const first = Math.random() < 0.5 ? 1 : 2;
      setCurrentPlayer(first);
      setTarget(Math.floor(Math.random() * 100) + 1);
    }
  };

  // Step 2: Handle guessing
  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || winner) return;

    const newAttempts = { ...attempts };
    newAttempts[currentPlayer]++;
    setAttempts(newAttempts);

    if (num === target) {
      setFeedback(`🎉 Correct, ${playerNames[currentPlayer]}!`);

      if (round === 1) {
        // First player finishes, now second player's turn
        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        setCurrentPlayer(nextPlayer);
        setRound(2);
        setTarget(Math.floor(Math.random() * 100) + 1);
        setGuess("");
      } else {
        // Second player finishes -> determine winner
        const a1 = attempts[1];
        const a2 = attempts[2];

        if (a1 < a2) setWinner(1);
        else if (a2 < a1) setWinner(2);
        else setWinner("tie");
      }
    } else {
      const hint = num < target ? "📉 Too low" : "📈 Too high";
      setFeedback(`${hint}, ${playerNames[currentPlayer]}!`);
    }

    setGuess("");
  };

  const handleRestart = () => {
    window.location.reload();
  };

  // Name entry screen
  if (!playerNames[1] || !playerNames[2]) {
    return (
      <div className="container">
        <h2>Enter Player Names</h2>
        <form onSubmit={handleNameSubmit} className="form-group">
          <input
            type="text"
            placeholder="Player 1 Name"
            value={nameInputs[1]}
            onChange={(e) =>
              setNameInputs({ ...nameInputs, 1: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={nameInputs[2]}
            onChange={(e) =>
              setNameInputs({ ...nameInputs, 2: e.target.value })
            }
          />
          <div classname="button-row">
          <button type="submit">Continue</button>
          </div>
        </form>
        <button onClick={goBack}>🔙 Back</button>
      </div>
    );
  }

  if (winner) {
    return (
      <div className="container">
        <h2>Classic Duel</h2>
        <h3>
          {winner === "tie"
            ? "🤝 It’s a tie!"
            : `🏆 ${playerNames[winner]} wins!`}
        </h3>
        <p>Attempts:</p>
        <ul>
          <li>
            {playerNames[1].toUpperCase()}: {attempts[1]} tries
          </li>
          <li>
            {playerNames[2].toUpperCase()}: {attempts[2]} tries
          </li>
        </ul>
        <button onClick={handleRestart}>🔄 Play Again</button>
        <button onClick={goBack}>🔙 Back to Menu</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Classic Duel</h2>
      <p>🎯 Guess a number between 1 to 100</p>
      <p>🎮 {playerNames[currentPlayer]}'s turn</p>

      <div className="guess-wrapper">
        <div className="input-feedback">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
           <button onClick={handleGuess}>Guess</button>
        </div>
       <span className="feedback">{feedback}</span>
      </div>

      <button onClick={goBack}>🔙 Back to Menu</button>
    </div>
  );
}

export default ClassicMode;