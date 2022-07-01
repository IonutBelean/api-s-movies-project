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
