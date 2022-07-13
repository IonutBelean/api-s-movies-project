import Layout from "../components/Layout";
import { getPopularMoviesEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { Container } from "react-bootstrap";
import { getMoviesList } from "../api/adaptors";
import MoviesCardList from "../components/MoviesCardList";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

const MoviesPopularity = () => {
  const queryParams = new URLSearchParams(useLocation().search);

  let currentPage = queryParams.get("page");

  if (!currentPage) {
    currentPage = 1;
  }

  const popularMoviesEndpoint = getPopularMoviesEndpoint(currentPage);

  const data = useFetch(popularMoviesEndpoint);

  const adaptedMoviesList = getMoviesList(data);

  return (
    <div>
      <Layout>
        <Container>
          <h1 className="text-center my-4">Most popular movies</h1>
          <MoviesCardList data={adaptedMoviesList} />
          <Pagination currentPage={currentPage} baseUrl="/MoviesPopularity/" />
        </Container>
      </Layout>
    </div>
  );
};

export default MoviesPopularity;
