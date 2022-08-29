import Layout from "../components/Layout";
import { getTvMoviesPopularityEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { Container } from "react-bootstrap";
import { getTvMoviesList } from "../api/adaptors";
import TvMoviesCardList from "../components/TvMoviesCardList";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

const TvMoviesPopularity = () => {
  const queryParams = new URLSearchParams(useLocation().search);

  let currentPage = queryParams.get("page");

  if (!currentPage) {
    currentPage = 1;
  }

  const tvMoviesEndpoint = getTvMoviesPopularityEndpoint(currentPage);

  const data = useFetch(tvMoviesEndpoint);

  const adaptedTvMoviesList = getTvMoviesList(data);

  return (
    <div>
      <Layout>
        <Container>
          <h1 className="text-center my-4">Most popular tv movies</h1>
          <TvMoviesCardList data={adaptedTvMoviesList} />
          <Pagination
            currentPage={currentPage}
            baseUrl="/TvMoviesPopularity/"
          />
        </Container>
      </Layout>
    </div>
  );
};

export default TvMoviesPopularity;
