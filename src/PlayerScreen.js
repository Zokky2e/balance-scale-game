import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebase";
import KeyPad from "./KeyPad";

function PlayerScreen() {
  const location = useLocation();
  const player = location.state;
  const navigate = useNavigate();
  const [number, setNumber] = useState(player.number);
  const [points, setPoints] = useState(player.points);
  const docName = player.name.replace(/\s/g, "");
  async function savePlayerChoice() {
    const docRef = doc(db, `game`, docName);
    await setDoc(docRef, {
      number: number,
      points: points,
    });
  }
  useEffect(() => {
    document.title = `${player.name} Screen`;
    onSnapshot(doc(db, "game", docName), (querySnapshot) => {
      setNumber(querySnapshot.data()["number"]);
      setPoints(querySnapshot.data()["points"]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={points > -10 ? "container" : "container dead"}>
      <p>
        {player.name}: <span>{points} points</span>
      </p>
      {points > -10 ? <p>{number}</p> : <p>Dead</p>}
      <KeyPad
        number={number}
        setNumber={(e) => setNumber(e)}
        isDead={!(points > -10)}
      />
      {points > -10 ? (
        <button
          onClick={() => {
            savePlayerChoice();
          }}
        >
          Confirm
        </button>
      ) : (
        <button
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Back
        </button>
      )}
    </div>
  );
}

export default PlayerScreen;
