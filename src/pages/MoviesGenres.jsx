import { getMoviesList } from "../api/adaptors";
import { getMoviesGenresEndpoint } from "../api/endpoints";
import MoviesCardList from "../components/MoviesCardList";
import { useFetch } from "../utils/hooks/useFetch";
import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { useLocation, useParams } from "react-router-dom";

const MoviesGenres = () => {
  const { genres } = useParams();
  const queryParams = new URLSearchParams(useLocation().search);
  let currentPage = queryParams.get("page");
  if (!currentPage) {
    currentPage = 1;
  }

  const moviesGenresEndpoint = getMoviesGenresEndpoint(genres, currentPage);
  const data = useFetch(moviesGenresEndpoint);
  const adaptedGenresList = getMoviesList(data);

  return (
    <div>
      <Layout>
        <Container>
          <MoviesCardList data={adaptedGenresList} />
          <Pagination
            currentPage={currentPage}
            baseUrl={`/MoviesGenres/${genres}`}
          />
        </Container>
      </Layout>
    </div>
  );
};

export default MoviesGenres;
