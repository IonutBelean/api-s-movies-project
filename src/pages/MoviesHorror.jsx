import { getMoviesList } from "../api/adaptors";
import { getMoviesHorrorEndpoint } from "../api/endpoints";
import MoviesCardList from "../components/MoviesCardList";
import { useFetch } from "../utils/hooks/useFetch";
import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import Pagination from "../components/Pagination";

import { useLocation } from "react-router-dom";

const MoviesHorror = () => {
  const queryParams = new URLSearchParams(useLocation().search);

  let currentPage = queryParams.get("page");

  if (!currentPage) {
    currentPage = 1;
  }

  const moviesHorrorEndpoint = getMoviesHorrorEndpoint(currentPage);

  const data = useFetch(moviesHorrorEndpoint);

  const adaptedHorrorList = getMoviesList(data);

  return (
    <div>
      <Layout>
        <Container>
          <MoviesCardList data={adaptedHorrorList} />
          <Pagination currentPage={currentPage} baseUrl="/MoviesHorror/" />
        </Container>
      </Layout>
    </div>
  );
};

export default MoviesHorror;
