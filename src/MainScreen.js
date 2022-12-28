import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./Firebase";
import usePlayer from "./usePlayer";

function MainScreen() {
  const navigate = useNavigate();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundWinner]);
  async function fetchDocs() {
    const docs = await getDocs(query(collection(db, "game")));
    docs.forEach((doc) => {
      switch (doc.id) {
        case "Player1": {
          player1.setPoints(doc.data()["points"]);
          player1.setInput(doc.data()["number"]);
          break;
        }
        case "Player2": {
          player2.setPoints(doc.data()["points"]);
          player2.setInput(doc.data()["number"]);
          break;
        }
        case "Player3": {
          player3.setPoints(doc.data()["points"]);
          player3.setInput(doc.data()["number"]);
          break;
        }
        case "Player4": {
          player4.setPoints(doc.data()["points"]);
          player4.setInput(doc.data()["number"]);
          break;
        }
        case "Player5": {
          player5.setPoints(doc.data()["points"]);
          player5.setInput(doc.data()["number"]);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  useEffect(() => {
    fetchDocs();
  }, []);
  async function resetGame() {
    const docNames = ["Player1", "Player2", "Player3", "Player4", "Player5"];
    docNames.forEach((docName) => {
      setDoc(doc(db, "game", docName), {
        number: 100,
        points: 0,
      });
    });
    fetchDocs();
    setIsRoundDone(false);
  }
  function calculate() {
    let players = [player1, player2, player3, player4, player5];
    players.filter((player) => parseInt(player.points) > -10);
    setIsRoundDone(true);
    let winner = 0;

    let average = 0;
    players.forEach((player) => {
      average = average + parseInt(player.input);
    });
    //TODO fix average when player dies
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
        const docName = players[i].name.replace(" ", "");
        setDoc(doc(db, "game", docName), {
          number: players[i].input,
          points: players[i].points - 1,
        });
      }
    }
  }
  return (
    <div className="container">
      <div>
        <h2>Balance Scale Game</h2>
      </div>
      <div className="players">
        {player1.points >= -10 && (
          <div className="container">
            <p>
              {player1.name}: <span>{player1.points} points</span>
            </p>
            <p>Number Chosen:</p>
            <p> {player1.input}</p>
            <br />
            <Link
              to={"/player"}
              state={{
                name: player1.name,
                points: player1.points,
              }}
            >
              Go to {player1.name} Screen
            </Link>
          </div>
        )}
        {player2.points >= -10 && (
          <div className="container">
            <p>
              {player2.name}: <span>{player2.points} points</span>
            </p>
            <p>Number Chosen: </p>
            <p>{player2.input}</p>
            <br />
            <Link
              to={"/player"}
              state={{
                name: player2.name,
                points: player2.points,
              }}
            >
              Go to {player2.name} Screen
            </Link>
          </div>
        )}
        {player3.points >= -10 && (
          <div className="container">
            <p>
              {player3.name}: <span>{player3.points} points</span>
            </p>
            <p>Number Chosen:</p>
            <p> {player3.input}</p>
            <br />
            <Link
              to={"/player"}
              state={{
                name: player3.name,
                points: player3.points,
              }}
            >
              Go to {player3.name} Screen
            </Link>
          </div>
        )}
        {player4.points >= -10 && (
          <div className="container">
            <p>
              {player4.name}: <span>{player4.points} points</span>
            </p>
            <p>Number Chosen:</p>
            <p> {player4.input}</p>
            <br />
            <Link
              to={"/player"}
              state={{
                name: player4.name,
                points: player4.points,
              }}
            >
              Go to {player4.name} Screen
            </Link>
          </div>
        )}
        {player5.points >= -10 && (
          <div className="container">
            <p>
              {player5.name}: <span>{player5.points} points</span>
            </p>
            <p>Number Chosen: </p>
            <p>{player5.input}</p>
            <br />
            <Link
              to={"/player"}
              state={{
                name: player5.name,
                points: player5.points,
              }}
            >
              Go to {player5.name} Screen
            </Link>
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
      <div>
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={fetchDocs}>Update Numbers</button>
      </div>
    </div>
  );
}

export default MainScreen;
