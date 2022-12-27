import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyPad from "./KeyPad";

function PlayerScreen() {
  const location = useLocation();
  const player = location.state;
  const navigate = useNavigate();
  const [number, setNumber] = useState(100);
  function savePlayerChoice() {}
  return (
    <div className="container">
      <p>
        {player.name}: <span>{player.points} points</span>
      </p>
      <p>{number}</p>
      <KeyPad number={number} setNumber={(e) => setNumber(e)} />
      <button
        onClick={() => {
          savePlayerChoice();
        }}
      >
        Confirm
      </button>
    </div>
  );
}

export default PlayerScreen;
