import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainScreen from "./MainScreen";
import PlayerScreen from "./PlayerScreen";
import RulesScreen from "./RulesScreen";
import usePlayer from "./usePlayer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/player" element={<PlayerScreen />} />
        <Route path="/rules" element={<RulesScreen />} />
      </Routes>
    </div>
  );
}

export default App;
