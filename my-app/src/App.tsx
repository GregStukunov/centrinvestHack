import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/GamePage/game-page";
import HomePage from "./pages/HomePage/home-page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
