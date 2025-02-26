export const adaptMoviesList = (apiResponse, type = "movie") => {
  if (!apiResponse?.results) {
    return [];
  }

  return apiResponse.results.map((item) => ({
    id: item.id,
    title: type === "movie" ? item.title : item.name,
    image: item.poster_path,
    votes: item.vote_average ?? "N/A",
    release:
      type === "movie" ? item.release_date : item.first_air_date || "Unknown",
  }));
};

export const getMoviesList = (apiResponse) =>
  adaptMoviesList(apiResponse, "movie");
export const getTvMoviesList = (apiResponse) =>
  adaptMoviesList(apiResponse, "tv");
