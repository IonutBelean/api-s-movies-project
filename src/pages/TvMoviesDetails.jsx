import { useParams } from "react-router-dom";
import { getTvMoviesDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import TvMoviesDetailsCSS from "./TvMoviesDetails.module.css";

const TvMoviesDetails = () => {
  const { movieId } = useParams();

  const tvMoviesDetailsEndpoint = getTvMoviesDetailsEndpoint(movieId);

  const data = useFetch(tvMoviesDetailsEndpoint);

  const { original_name, backdrop_path, overview, status, tagline } =
    data || {};

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Layout>
      <Container className={`${TvMoviesDetailsCSS.container}`}>
        <Row className="d-flex justify-content-center ">
          <Col xs={12} lg={8}>
            <h1 className="mb-5 pt-5 text-center">{original_name}</h1>
            <p className={`${TvMoviesDetailsCSS.tagline}`}>{tagline}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
              alt={`${original_name} image`}
            />
            <p className={`${TvMoviesDetailsCSS.status}`}>Status: {status}</p>
            <p className={`${TvMoviesDetailsCSS.overview}`}>{overview}</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default TvMoviesDetails;
