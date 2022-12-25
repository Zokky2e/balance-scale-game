import { useState } from "react";
import "./App.css";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");
  const [player5, setPlayer5] = useState("");
  const [player1points, setPlayer1points] = useState(0);
  const [player2points, setPlayer2points] = useState(0);
  const [player3points, setPlayer3points] = useState(0);
  const [player4points, setPlayer4points] = useState(0);
  const [player5points, setPlayer5points] = useState(0);
  const [result, setResult] = useState("");
  const [roundWinner, setRoundWinner] = useState("");
  function calculate() {
    let players = [player1, player2, player3, player4, player5];
    let winner = 0;
    if (
      players.some((player) => {
        return player === "";
      })
    ) {
      setResult("wrong input!");
      return;
    }
    let average = 0;
    players.forEach((player) => {
      average = average + parseInt(player);
    });
    average /= 5;
    average = (average * 0.8).toFixed(2);
    setResult(average);
    let difference = 100;
    for (let i = 0; i < 5; i++) {
      let newDifference = Math.abs(parseInt(players[i]) - average);
      if (newDifference < difference) {
        difference = newDifference;
        winner = i;
      }
    }
    switch (winner) {
      case 0: {
        setRoundWinner("Winner: Player 1");
        setPlayer2points((prev) => prev - 1);
        setPlayer3points((prev) => prev - 1);
        setPlayer4points((prev) => prev - 1);
        setPlayer5points((prev) => prev - 1);
        break;
      }
      case 1: {
        setRoundWinner("Winner: Player 2");
        setPlayer1points((prev) => prev - 1);
        setPlayer3points((prev) => prev - 1);
        setPlayer4points((prev) => prev - 1);
        setPlayer5points((prev) => prev - 1);
        break;
      }
      case 2: {
        setRoundWinner("Winner: Player 3");
        setPlayer2points((prev) => prev - 1);
        setPlayer1points((prev) => prev - 1);
        setPlayer4points((prev) => prev - 1);
        setPlayer5points((prev) => prev - 1);
        break;
      }
      case 3: {
        setRoundWinner("Winner: Player 4");
        setPlayer2points((prev) => prev - 1);
        setPlayer3points((prev) => prev - 1);
        setPlayer1points((prev) => prev - 1);
        setPlayer5points((prev) => prev - 1);
        break;
      }
      case 4: {
        setRoundWinner("Winner: Player 5");
        setPlayer2points((prev) => prev - 1);
        setPlayer3points((prev) => prev - 1);
        setPlayer4points((prev) => prev - 1);
        setPlayer1points((prev) => prev - 1);
        break;
      }
      default: {
        setRoundWinner("Nobody wins!");
        break;
      }
    }
  }
  return (
    <div className="container">
      <div>
        <h2>Balance Scale Game</h2>
      </div>
      <div className="players">
        <div>
          <p>
            Player 1: <span>{player1points} points</span>
          </p>
          <input
            type="number"
            value={player1}
            onChange={(e) => {
              setPlayer1(e.target.value);
            }}
          />
        </div>
        <div>
          <p>
            Player 2: <span>{player2points} points</span>
          </p>
          <input
            type="number"
            value={player2}
            onChange={(e) => {
              setPlayer2(e.target.value);
            }}
          />
        </div>
        <div>
          <p>
            Player 3: <span>{player3points} points</span>
          </p>
          <input
            type="number"
            value={player3}
            onChange={(e) => {
              setPlayer3(e.target.value);
            }}
          />
        </div>
        <div>
          <p>
            Player 4: <span>{player4points} points</span>
          </p>
          <input
            type="number"
            value={player4}
            onChange={(e) => {
              setPlayer4(e.target.value);
            }}
          />
        </div>
        <div>
          <p>
            Player 5: <span>{player5points} points</span>
          </p>
          <input
            type="number"
            value={player5}
            onChange={(e) => {
              setPlayer5(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <p>Calculated result: {result}</p>
        <button onClick={calculate}>Do calculation</button>
        <p>{roundWinner}</p>
      </div>
      <div></div>
    </div>
  );
}

export default App;
