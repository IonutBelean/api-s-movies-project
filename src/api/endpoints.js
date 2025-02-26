const API_KEY = "448c4b7fa8ff1e74ed9d6db8b4a958e8";
const BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_PARAMS = `api_key=${API_KEY}&language=en-US`;

const createEndpoint = (path, params = "") =>
  `${BASE_URL}/${path}?${DEFAULT_PARAMS}${params}`;

export const getPopularMoviesEndpoint = (page = 1) =>
  createEndpoint("movie/popular", `&page=${page}`);

export const getMoviesTopRatedEndpoint = (page = 1) =>
  createEndpoint("movie/top_rated", `&page=${page}`);

export const getMoviesGenresEndpoint = (genres, page = 1) =>
  createEndpoint("discover/movie", `&with_genres=${genres}&page=${page}`);

export const getMoviesDetailsEndpoint = (movieId) =>
  createEndpoint(`movie/${movieId}`);

export const getTvMoviesPopularityEndpoint = (page = 1) =>
  createEndpoint("tv/popular", `&page=${page}`);

export const getTvMoviesDetailsEndpoint = (movieId) =>
  createEndpoint(`tv/${movieId}`);

export const getTvMoviesTopRatedEndpoint = (page = 1) =>
  createEndpoint("tv/top_rated", `&page=${page}`);

export const getSearchEndpoint = (query) => {
  return `${BASE_URL}/search/movie?query=${encodeURIComponent(
    query
  )}&api_key=${API_KEY}`;
};
