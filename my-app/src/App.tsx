import { BrowserRouter, Routes, Route } from "react-router-dom";
import Learning from "./pages/GamePage/components/learning/learning";
import { GamePage } from "./pages/GamePage/game-page";
import HomePage from "./pages/HomePage/home-page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/learning" element={<Learning/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
