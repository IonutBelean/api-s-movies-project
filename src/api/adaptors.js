export const getMoviesList = (apiResponse) => {
  if (!apiResponse || !apiResponse.results) {
    return [];
  }

  const rawMoviesList = apiResponse.results;

  const adaptedMoviesList = rawMoviesList.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      image: movie.poster_path,
      votes: movie.vote_average,
      release: movie.release_date,
    };
  });

  return adaptedMoviesList;
};

export const getTvMoviesList = (apiResponse) => {
  if (!apiResponse || !apiResponse.results) {
    return [];
  }

  const rawTvMoviesList = apiResponse.results;

  const adaptedTvMoviesList = rawTvMoviesList.map((movie) => {
    return {
      id: movie.id,
      title: movie.name,
      image: movie.poster_path,
      votes: movie.vote_average,
      release: movie.first_air_date,
    };
  });

  return adaptedTvMoviesList;
};
