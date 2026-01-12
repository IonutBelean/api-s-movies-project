import { useParams } from "react-router-dom";
import { getMoviesDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import MoviesDetailsCSS from "./MoviesDetalis.module.css";

const MoviesDetails = () => {
  const { movieId } = useParams();
  const data = useFetch(getMoviesDetailsEndpoint(movieId));
  const { title, backdrop_path, overview, runtime, tagline } = data || {};

  const [dbpediaInfo, setDbpediaInfo] = useState(null);
  const [loadingDbpedia, setLoadingDbpedia] = useState(false);

  useEffect(() => {
    const fetchDbpediaInfo = async () => {
      if (!title) return;
      setLoadingDbpedia(true);
      try {
        const res = await axios.post("/.netlify/functions/dbpediaInfo", {
          title,
        });
        const info = res.data;

        // Curățăm DBpedia de link-uri ciudate
        const cleanInfo = { ...info };
        ["director", "starring", "producer", "writer", "genre"].forEach(
          (key) => {
            if (cleanInfo[key]?.uri) {
              cleanInfo[key] = { name: cleanInfo[key].name };
            }
          }
        );
        if (cleanInfo.language?.uri)
          cleanInfo.language = cleanInfo.language.name;
        if (cleanInfo.country?.uri) cleanInfo.country = cleanInfo.country.name;

        setDbpediaInfo(cleanInfo);
      } catch (err) {
        console.error("DBpedia Error:", err);
        setDbpediaInfo(null);
      } finally {
        setLoadingDbpedia(false);
      }
    };

    fetchDbpediaInfo();
  }, [title]);

  const renderPersons = (persons) => {
    if (!persons) return "Unknown";
    const arr = Array.isArray(persons) ? persons : [persons];
    return arr.map((p, i) => (
      <span key={i}>
        {p.name}
        {i < arr.length - 1 ? ", " : ""}
      </span>
    ));
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return "N/A";
    const num = parseFloat(runtime);
    return num > 500 ? Math.round(num / 60) + " minutes" : num + " minutes";
  };

  const formatMoney = (value) => {
    if (!value) return "N/A";
    const num = parseFloat(value);
    return "$" + num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const motionView = { once: false, amount: 0.5 };

  return (
    <Layout>
      <Container className={MoviesDetailsCSS.container}>
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <motion.h1
              className="mb-4 pt-4 text-center"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: { type: "spring", delay: 0.3 },
              }}
              viewport={motionView}
            >
              {title}
            </motion.h1>

            <motion.p
              className={MoviesDetailsCSS.tagline}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: { type: "spring", delay: 0.6 },
              }}
              viewport={motionView}
            >
              {tagline}
            </motion.p>

            <motion.img
              src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
              alt={title}
              className={MoviesDetailsCSS.image}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 120 },
              }}
              viewport={motionView}
            />

            <motion.p
              className={MoviesDetailsCSS.duration}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { type: "spring", delay: 0.4 },
              }}
              viewport={{ once: false, amount: 0.2 }}
            >
              Duration: {runtime || "N/A"} minutes.
            </motion.p>

            <motion.p
              className={MoviesDetailsCSS.overview}
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

            {title && (
              <motion.div
                className={MoviesDetailsCSS.dbpediaSection}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", delay: 0.6 },
                }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <h3>Extra Information from DBpedia</h3>
                {loadingDbpedia ? (
                  <div className="text-center my-3">
                    <Spinner animation="border" role="status" />
                    <p className="mt-2">Loading additional information...</p>
                  </div>
                ) : dbpediaInfo ? (
                  <>
                    {dbpediaInfo.director && (
                      <p>
                        <strong>Director:</strong>{" "}
                        {renderPersons(dbpediaInfo.director)}
                      </p>
                    )}
                    {dbpediaInfo.starring && (
                      <p>
                        <strong>Main Actor:</strong>{" "}
                        {renderPersons(dbpediaInfo.starring)}
                      </p>
                    )}
                    {dbpediaInfo.producer && (
                      <p>
                        <strong>Producer:</strong>{" "}
                        {renderPersons(dbpediaInfo.producer)}
                      </p>
                    )}
                    {dbpediaInfo.writer && (
                      <p>
                        <strong>Writer:</strong>{" "}
                        {renderPersons(dbpediaInfo.writer)}
                      </p>
                    )}
                    {dbpediaInfo.genre && (
                      <p>
                        <strong>Genre:</strong>{" "}
                        {renderPersons(dbpediaInfo.genre)}
                      </p>
                    )}
                    {dbpediaInfo.releaseDate && (
                      <p>
                        <strong>Release Date:</strong> {dbpediaInfo.releaseDate}
                      </p>
                    )}
                    {dbpediaInfo.runtime && (
                      <p>
                        <strong>Runtime:</strong>{" "}
                        {formatRuntime(dbpediaInfo.runtime)}
                      </p>
                    )}
                    {dbpediaInfo.budget && (
                      <p>
                        <strong>Budget:</strong>{" "}
                        {formatMoney(dbpediaInfo.budget)}
                      </p>
                    )}
                    {dbpediaInfo.gross && (
                      <p>
                        <strong>Box Office:</strong>{" "}
                        {formatMoney(dbpediaInfo.gross)}
                      </p>
                    )}
                    {dbpediaInfo.language && (
                      <p>
                        <strong>Language:</strong> {dbpediaInfo.language}
                      </p>
                    )}
                    {dbpediaInfo.country && (
                      <p>
                        <strong>Country:</strong> {dbpediaInfo.country}
                      </p>
                    )}
                    {dbpediaInfo.abstract && (
                      <p>
                        <strong>Abstract:</strong> {dbpediaInfo.abstract}
                      </p>
                    )}
                    {!dbpediaInfo.abstract &&
                      !dbpediaInfo.director &&
                      !dbpediaInfo.starring &&
                      !dbpediaInfo.releaseDate &&
                      !dbpediaInfo.budget &&
                      !dbpediaInfo.gross && (
                        <p>
                          🔍 No additional information found on DBpedia for this
                          title.
                        </p>
                      )}
                  </>
                ) : (
                  <p>
                    🔍 No additional information found on DBpedia for this
                    title.
                  </p>
                )}
              </motion.div>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default MoviesDetails;
