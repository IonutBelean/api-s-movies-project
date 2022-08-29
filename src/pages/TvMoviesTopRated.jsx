import { getTvMoviesList } from "../api/adaptors";
import { getTvMoviesTopRatedEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import MoviesCardList from "../components/MoviesCardList";
import Pagination from "../components/Pagination";
import { useFetch } from "../utils/hooks/useFetch";
import { useLocation } from "react-router-dom";

const TvMoviesTopRated = () => {
  const queryParams = new URLSearchParams(useLocation().search);

  let currentPage = queryParams.get("page");

  if (!currentPage) {
    currentPage = 1;
  }

  const tvMoviesTopRatedEndpoint = getTvMoviesTopRatedEndpoint(currentPage);

  const data = useFetch(tvMoviesTopRatedEndpoint);

  const adaptedTvMoviesList = getTvMoviesList(data);

  return (
    <Layout>
      <h1 className="text-center my-4">Top rated tv movies</h1>
      <MoviesCardList data={adaptedTvMoviesList} />
      <Pagination currentPage={currentPage} baseUrl="/TvMoviesTopRated/" />
    </Layout>
  );
};

export default TvMoviesTopRated;
