import { useEffect, useState } from "react";
import "./App.css";
import usePlayer from "./usePlayer";

function App() {
  const player1 = usePlayer({ Name: "Player 1" });
  const player2 = usePlayer({ Name: "Player 2" });
  const player3 = usePlayer({ Name: "Player 3" });
  const player4 = usePlayer({ Name: "Player 4" });
  const player5 = usePlayer({ Name: "Player 5" });
  const [livingPlayers, setLivingPlayers] = useState([
    player1,
    player2,
    player3,
    player4,
    player5,
  ]);
  const [result, setResult] = useState("");
  const [roundWinner, setRoundWinner] = useState("");
  const [isRoundDone, setIsRoundDone] = useState(false);
  useEffect(() => {
    if (livingPlayers.length !== 0) {
      setLivingPlayers((prev) =>
        prev.filter((player) => parseInt(player.points) > -10)
      );
    }
  }, [roundWinner]);
  function calculate() {
    let players = [player1, player2, player3, player4, player5];
    setIsRoundDone(true);
    let winner = 0;
    if (
      players.some((player) => {
        return player.input === "";
      })
    ) {
      setResult("wrong input!");
      return;
    }
    let average = 0;
    players.forEach((player) => {
      average = average + parseInt(player.input);
    });
    average /= players.length;
    average = (average * 0.8).toFixed(2);
    setResult(average);
    let difference = 100;
    for (let i = 0; i < players.length; i++) {
      let newDifference = Math.abs(parseInt(players[i].input) - average);
      if (newDifference < difference) {
        difference = newDifference;
        winner = i;
      }
    }
    setRoundWinner("Winner: " + players[winner].name);
    for (let i = 0; i < players.length; i++) {
      if (i !== winner) {
        players[i].setPoints((prev) => prev - 1);
      }
    }
  }
  function clearInputs() {
    let players = [player1, player2, player3, player4, player5];
    players.forEach((player) => {
      player.setInput("");
    });
    setIsRoundDone(false);
  }
  return (
    <div className="container">
      <div>
        <h2>Balance Scale Game</h2>
      </div>
      <div className="players">
        {player1.points >= -10 && (
          <div>
            <p>
              {player1.name}: <span>{player1.points} points</span>
            </p>
            <input
              type="number"
              value={player1.input}
              onChange={(e) => {
                player1.setInput(e.target.value);
              }}
            />
          </div>
        )}
        {player2.points >= -10 && (
          <div>
            <p>
              {player2.name}: <span>{player2.points} points</span>
            </p>
            <input
              type="number"
              value={player2.input}
              onChange={(e) => {
                player2.setInput(e.target.value);
              }}
            />
          </div>
        )}
        {player3.points >= -10 && (
          <div>
            <p>
              {player3.name}: <span>{player3.points} points</span>
            </p>
            <input
              type="number"
              value={player3.input}
              onChange={(e) => {
                player3.setInput(e.target.value);
              }}
            />
          </div>
        )}
        {player4.points >= -10 && (
          <div>
            <p>
              {player4.name}: <span>{player4.points} points</span>
            </p>
            <input
              type="number"
              value={player4.input}
              onChange={(e) => {
                player4.setInput(e.target.value);
              }}
            />
          </div>
        )}
        {player5.points >= -10 && (
          <div>
            <p>
              {player5.name}: <span>{player5.points} points</span>
            </p>
            <input
              type="number"
              value={player5.input}
              onChange={(e) => {
                player5.setInput(e.target.value);
              }}
            />
          </div>
        )}
      </div>
      <div className="container">
        <p className={isRoundDone ? "visible" : "hidden"}>
          Calculated result: {result}
        </p>
        <button onClick={calculate}>Do calculation</button>
        <p>{roundWinner}</p>
      </div>
      <div>{isRoundDone && <button onClick={clearInputs}>Clear</button>}</div>
    </div>
  );
}

export default App;
