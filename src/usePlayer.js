import { useState } from "react";

function usePlayer(props) {
  const name = props.Name;
  const [playerInput, setPlayerInput] = useState("");
  const [playerPoints, setPlayerPoints] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const player = {
    name,
    playerInput,
    setPlayerInput,
    playerPoints,
    setPlayerPoints,
  };
  return player;
}

export default usePlayer;
