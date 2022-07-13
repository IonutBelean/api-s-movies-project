import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPopularity from "./pages/MoviesPopularity";
import MoviesTopRated from "./pages/MoviesTopRated";
import MoviesGenres from "./pages/MoviesGenres";
import MoviesDetails from "./pages/MoviesDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MoviesPopularity" element={<MoviesPopularity />} />
        <Route path="/MoviesTopRated" element={<MoviesTopRated />} />
        <Route path="/MoviesGenres/:genres" element={<MoviesGenres />} />
        <Route path="/MoviesDetails/:movieId" element={<MoviesDetails />} />
      </Routes>
    </div>
  );
}

export default App;
