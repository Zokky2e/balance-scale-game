import { computeHeadingLevel } from "@testing-library/react";
import { useEffect, useState } from "react";
import "./App.css";
import usePlayer from "./usePlayer";

function App() {
  const player1 = usePlayer({ Name: "Player 1" });
  const player2 = usePlayer({ Name: "Player 2" });
  const player3 = usePlayer({ Name: "Player 3" });
  const player4 = usePlayer({ Name: "Player 4" });
  const player5 = usePlayer({ Name: "Player 5" });
  const [livingPlayers, setLivingPlayers] = useState([]);
  const [result, setResult] = useState("");
  const [roundWinner, setRoundWinner] = useState("");
  useEffect(() => {
    setLivingPlayers([player1, player2, player3, player4, player5]);
  }, []);
  useEffect(() => {
    setLivingPlayers((prev) =>
      prev.filter((player) => parseInt(player.playerPoints) > -10)
    );

    console.log(livingPlayers);
  }, [roundWinner]);
  function calculate() {
    let players = livingPlayers;
    let winner = 0;
    if (
      players.some((player) => {
        return player.playerInput === "";
      })
    ) {
      setResult("wrong input!");
      return;
    }
    let average = 0;
    players.forEach((player) => {
      average = average + parseInt(player.playerInput);
    });
    average /= players.length;
    average = (average * 0.8).toFixed(2);
    setResult(average);
    let difference = 100;
    for (let i = 0; i < players.length; i++) {
      let newDifference = Math.abs(parseInt(players[i].playerInput) - average);
      if (newDifference < difference) {
        difference = newDifference;
        winner = i;
      }
    }
    setRoundWinner("Winner: " + players[winner].name);
    for (let i = 0; i < players.length; i++) {
      if (i !== winner) {
        players[i].setPlayerPoints((prev) => prev - 1);
      }
    }
  }
  return (
    <div className="container">
      <div>
        <h2>Balance Scale Game</h2>
      </div>
      <div className="players">
        {livingPlayers.map((player) => (
          <div key={player.name}>
            <p>
              {player.name}: <span>{player.playerPoints} points</span>
            </p>
            <input
              type="text"
              value={player.playerInput}
              onChange={(e) => {
                player.setPlayerInput(e.target.value);
                //TODO doesnt work as intended
              }}
            />
          </div>
        ))}
      </div>
      <div className="container">
        <p>Calculated result: {result}</p>
        <button onClick={calculate}>Do calculation</button>
        <p>{roundWinner}</p>
      </div>
      <div></div>
    </div>
  );
}

export default App;
