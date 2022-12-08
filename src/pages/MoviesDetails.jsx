import { useParams } from "react-router-dom";
import { getMoviesDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { Container, Row, Col } from "react-bootstrap";
import MoviesDetailsCSS from "./MoviesDetalis.module.css";
import { motion } from "framer-motion";

const MoviesDetails = () => {
  const { movieId } = useParams();

  const moviesDetailsEndpoint = getMoviesDetailsEndpoint(movieId);

  const data = useFetch(moviesDetailsEndpoint);

  const { title, backdrop_path, overview, runtime, tagline } = data || {};

  return (
    <Layout>
      <Container className={`${MoviesDetailsCSS.container}`}>
        <Row className="d-flex justify-content-center ">
          <Col xs={12} lg={8}>
            <motion.h1
              className="mb-5 pt-5 text-center"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: { type: "spring", delay: 0.3 },
              }}
              viewport={{ once: false, amount: 0.5 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className={`${MoviesDetailsCSS.tagline}`}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: { type: "spring", delay: 0.6 },
              }}
              viewport={{ once: false, amount: 0.5 }}
            >
              {tagline}
            </motion.p>
            <motion.img
              src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
              alt={`${title} `}
              className={`${MoviesDetailsCSS.image}`}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 120 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ staggerChildren: 0.2 }}
            />
            <motion.p
              className={`${MoviesDetailsCSS.duration}`}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { type: "spring", delay: 0.6 },
              }}
              viewport={{ once: false, amount: 0.2 }}
            >
              Duration: {runtime} minutes.
            </motion.p>
            <motion.p
              className={`${MoviesDetailsCSS.overview}`}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { type: "spring", delay: 0.6 },
              }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {overview}
            </motion.p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default MoviesDetails;
