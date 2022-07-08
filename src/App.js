import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPopularity from "./pages/MoviesPopularity";
import MoviesTopRated from "./pages/MoviesTopRated";
import MoviesHorror from "./pages/MoviesHorror";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MoviesPopularity" element={<MoviesPopularity />} />
        <Route path="/MoviesTopRated" element={<MoviesTopRated />} />
        <Route path="/MoviesHorror" element={<MoviesHorror />} />
      </Routes>
    </div>
  );
}

export default App;
