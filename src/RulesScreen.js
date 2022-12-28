import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RulesScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Rules Screen";
  }, []);
  return (
    <div className="rules">
      <div className="header">
        <button
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Back
        </button>
        <h2>Balance Scale rules and description</h2>
        <div className="header-spacer"></div>
      </div>
      <p>
        {" "}
        Five players start the game with 0 points. Each round they choose a
        random number between 0 and 100. The computer, then calculates an
        average from the choices and multiplies it with 0.8. The player closest
        to that result doesn't lose a point. The player that gets to -10 points
        gets GAME OVER.
      </p>
      <p>Every time a player gets to -10 points, a new rule is added: </p>
      <p>
        <b>After 1 person:</b>
      </p>
      <p>If two or more players guess the same number they all lose points.</p>{" "}
      <p>
        <b>After 2 people:</b>
      </p>{" "}
      <p>
        If a player guesses the number that gets calculated other players lose 2
        instead of 1 point.{" "}
      </p>
      <p>
        <b>After 3 people: </b>
      </p>
      <p>
        If a player chooses 0 as their number the other player will win if they
        choose 100!
      </p>
      <h2>Good luck!</h2>
    </div>
  );
}

export default RulesScreen;
