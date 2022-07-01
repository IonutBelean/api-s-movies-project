import { getMoviesList } from "../api/adaptors";
import { getMoviesTopRatedEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import MoviesCardList from "../components/MoviesCardList";
import Pagination from "../components/Pagination";
import { useFetch } from "../utils/hooks/useFetch";
import { useLocation } from "react-router-dom";

const MoviesTopRated = () => {
  const queryParams = new URLSearchParams(useLocation().search);

  let currentPage = queryParams.get("page");

  if (!currentPage) {
    currentPage = 1;
  }

  const topRatedMoviesEndpoint = getMoviesTopRatedEndpoint(currentPage);

  const data = useFetch(topRatedMoviesEndpoint);

  const adaptedMoviesList = getMoviesList(data);

  return (
    <Layout>
      <MoviesCardList data={adaptedMoviesList} />
      <Pagination currentPage={currentPage} baseUrl="/MoviesTopRated/" />
    </Layout>
  );
};

export default MoviesTopRated;
