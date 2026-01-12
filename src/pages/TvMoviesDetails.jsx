import { useParams } from "react-router-dom";
import { getTvMoviesDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import TvMoviesDetailsCSS from "./TvMoviesDetails.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const TvMoviesDetails = () => {
  const { movieId } = useParams();
  const tvMoviesDetailsEndpoint = getTvMoviesDetailsEndpoint(movieId);
  const data = useFetch(tvMoviesDetailsEndpoint);
  const { original_name, backdrop_path, overview, status, tagline } =
    data || {};

  const [dbpediaInfo, setDbpediaInfo] = useState(null);
  const [loadingDbpedia, setLoadingDbpedia] = useState(false);

  useEffect(() => {
    const fetchDbpediaInfo = async () => {
      if (!original_name) return;
      setLoadingDbpedia(true);
      try {
        const res = await axios.post("/.netlify/functions/dbpediaInfo", {
          title: original_name,
        });
        const info = res.data;

        // Curățăm DBpedia de link-uri uriase / ciudate
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
  }, [original_name]);

  const renderPersons = (persons) => {
    if (!persons) return "N/A";
    const arr = Array.isArray(persons) ? persons : [persons];
    return arr.map((p, i) => (
      <span key={i}>
        {p.name}
        {i < arr.length - 1 ? ", " : ""}
      </span>
    ));
  };

  const motionView = { once: false, amount: 0.5 };

  return (
    <Layout>
      <Container className={TvMoviesDetailsCSS.container}>
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
              {original_name || "No Title"}
            </motion.h1>

            {tagline && (
              <motion.p
                className={TvMoviesDetailsCSS.tagline}
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
            )}

            {backdrop_path && (
              <motion.img
                src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                alt={original_name}
                className={TvMoviesDetailsCSS.image}
                onError={(e) => (e.target.src = "/nophoto.png")}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 120 },
                }}
                viewport={motionView}
              />
            )}

            {status && (
              <motion.p
                className={TvMoviesDetailsCSS.status}
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
            )}

            {overview && (
              <motion.p
                className={TvMoviesDetailsCSS.overview}
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
            )}

            {original_name && (
              <motion.div
                className={TvMoviesDetailsCSS.dbpediaSection}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", delay: 0.6 },
                }}
              >
                <h3>Extra Information from DBpedia</h3>

                {loadingDbpedia ? (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
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
                      !dbpediaInfo.producer &&
                      !dbpediaInfo.writer &&
                      !dbpediaInfo.genre && (
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

export default TvMoviesDetails;
