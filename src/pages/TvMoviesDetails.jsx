import { useParams } from "react-router-dom";
import { getTvMoviesDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { Container, Row, Col } from "react-bootstrap";
import TvMoviesDetailsCSS from "./TvMoviesDetails.module.css";
import { motion } from "framer-motion";

const TvMoviesDetails = () => {
  const { movieId } = useParams();

  const tvMoviesDetailsEndpoint = getTvMoviesDetailsEndpoint(movieId);

  const data = useFetch(tvMoviesDetailsEndpoint);

  const { original_name, backdrop_path, overview, status, tagline } =
    data || {};

  return (
    <Layout>
      <Container className={`${TvMoviesDetailsCSS.container}`}>
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
              {original_name}
            </motion.h1>
            <motion.p
              className={`${TvMoviesDetailsCSS.tagline}`}
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
              alt={`${original_name}.`}
              className={`${TvMoviesDetailsCSS.image}`}
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
              className={`${TvMoviesDetailsCSS.status}`}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { type: "spring", delay: 0.4 },
              }}
              viewport={{ once: false, amount: 0.2 }}
            >
              Status: {status}
            </motion.p>
            <motion.p
              className={`${TvMoviesDetailsCSS.overview}`}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { type: "spring", delay: 0.5 },
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

export default TvMoviesDetails;
