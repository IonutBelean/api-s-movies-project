const API_KEY = "448c4b7fa8ff1e74ed9d6db8b4a958e8";

export const getPopularMoviesEndpoint = (page = 1) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
};

export const getMoviesTopRatedEndpoint = (page = 1) => {
  return `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
};

export const getMoviesHorrorEndpoint = (page = 1) => {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page}`;
};
