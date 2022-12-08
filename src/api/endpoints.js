const API_KEY = "448c4b7fa8ff1e74ed9d6db8b4a958e8";

export const getPopularMoviesEndpoint = (page = 1) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
};

export const getMoviesTopRatedEndpoint = (page = 1) => {
  return `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
};

export const getMoviesGenresEndpoint = (genres, page = 1) => {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genres}&page=${page}`;
};

export const getMoviesDetailsEndpoint = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
};

export const getTvMoviesPopularityEndpoint = (page = 1) => {
  return `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`;
};

export const getTvMoviesDetailsEndpoint = (movieId) => {
  return `https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY}&language=en-US`;
};

export const getTvMoviesTopRatedEndpoint = (page = 1) => {
  return `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
};
