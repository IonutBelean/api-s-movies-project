import { useParams } from "react-router-dom";
import { getMoviesDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import MoviesDetailsCSS from "./MoviesDetalis.module.css";

const MoviesDetails = () => {
  const { movieId } = useParams();

  const moviesDetailsEndpoint = getMoviesDetailsEndpoint(movieId);

  const data = useFetch(moviesDetailsEndpoint);

  const { title, backdrop_path, overview, runtime, tagline } = data || {};

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Layout>
      <Container className={`${MoviesDetailsCSS.container}`}>
        <Row className="d-flex justify-content-center ">
          <Col xs={12} lg={8}>
            <h1 className="mb-5 pt-5 text-center">{title}</h1>
            <p className={`${MoviesDetailsCSS.tagline}`}>{tagline}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
              alt={`${title} image`}
            />
            <p className={`${MoviesDetailsCSS.duration}`}>
              Duration: {runtime} minutes.
            </p>
            <p className={`${MoviesDetailsCSS.overview}`}>{overview}</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default MoviesDetails;
