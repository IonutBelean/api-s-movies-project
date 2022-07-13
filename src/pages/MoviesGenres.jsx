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

  let title;

  switch (genres) {
    case "27": {
      title = "Horror";
      break;
    }
    case "28": {
      title = "Action";
      break;
    }
    case "35": {
      title = "Comedy";
      break;
    }
    case "12": {
      title = "Adventure";
      break;
    }
    case "16": {
      title = "Animation";
      break;
    }
    case "10752": {
      title = "War";
      break;
    }
    case "18": {
      title = "Drama";
      break;
    }
    case "878": {
      title = "Science Fiction";
      break;
    }
    case "37": {
      title = "Western";
      break;
    }
    default:
      title = "";
      break;
  }

  return (
    <div>
      <Layout>
        <Container>
          <h1 className="text-center my-4">{title}</h1>
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
