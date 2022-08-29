import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPopularity from "./pages/MoviesPopularity";
import MoviesTopRated from "./pages/MoviesTopRated";
import MoviesGenres from "./pages/MoviesGenres";
import MoviesDetails from "./pages/MoviesDetails";
import TvMoviesDetails from "./pages/TvMoviesDetails";
import TvMoviesPopularity from "./pages/TvMoviesPopularity";
import TvMoviesTopRated from "./pages/TvMoviesTopRated";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MoviesPopularity" element={<MoviesPopularity />} />
        <Route path="/MoviesTopRated" element={<MoviesTopRated />} />
        <Route path="/MoviesGenres/:genres" element={<MoviesGenres />} />
        <Route path="/MoviesDetails/:movieId" element={<MoviesDetails />} />
        <Route path="/TvMoviesPopularity" element={<TvMoviesPopularity />} />
        <Route path="/TvMoviesDetails/:movieId" element={<TvMoviesDetails />} />
        <Route path="/TvMoviesTopRated" element={<TvMoviesTopRated />} />
      </Routes>
    </div>
  );
}

export default App;
