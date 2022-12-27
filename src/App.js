import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainScreen from "./MainScreen";
import PlayerScreen from "./PlayerScreen";
import usePlayer from "./usePlayer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/player" element={<PlayerScreen />} />
      </Routes>
    </div>
  );
}

export default App;
