import Layout from "../components/Layout";
import TvMoviesCardList from "../components/TvMoviesCardList";
import Pagination from "../components/Pagination";
import { getTvMoviesList } from "../api/adaptors";
import { getTvMoviesTopRatedEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

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
      <Container>
        <h1 className="text-center my-4">Top rated tv movies</h1>
        <TvMoviesCardList data={adaptedTvMoviesList} />
        <Pagination currentPage={currentPage} baseUrl="/TvMoviesTopRated/" />
      </Container>
    </Layout>
  );
};

export default TvMoviesTopRated;
