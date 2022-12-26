import { useState } from "react";

function usePlayer(props) {
  const name = props.Name;
  const [input, setInput] = useState("");
  const [points, setPoints] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const player = {
    name,
    input,
    setInput,
    points,
    setPoints,
  };
  return player;
}

export default usePlayer;
