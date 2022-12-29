import { useEffect, useState } from "react";
import "./KeyPad.css";
function KeyPad(props) {
  const [numbers, setNumbers] = useState([]);
  const addNumbers = () => {
    for (let i = 0; i <= 100; i++) {
      setNumbers((prev) => [...prev, i]);
    }
  };
  useEffect(() => {
    setNumbers([]);
    addNumbers();
  }, []);
  return (
    <div className="numbers-container">
      {" "}
      <div className="spacer"></div>
      {numbers.map((number) =>
        props.isDead ? (
          <button disabled style={{ cursor: "not-allowed" }}>
            {number}
          </button>
        ) : (
          <button
            key={number}
            onClick={() => {
              props.setNumber(number);
            }}
          >
            {number}
          </button>
        )
      )}
    </div>
  );
}

export default KeyPad;
