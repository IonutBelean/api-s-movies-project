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
      setLoadingDbpedia(true);
      try {
        const res = await axios.post("/.netlify/functions/dbpediaInfo", {
          title: original_name,
        });
        setDbpediaInfo(res.data);
      } catch (err) {
        console.error("DBpedia error:", err);
      } finally {
        setLoadingDbpedia(false);
      }
    };

    if (original_name) {
      fetchDbpediaInfo();
    }
  }, [original_name]);

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
              viewport={{ once: false, amount: 0.5 }}
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
                viewport={{ once: false, amount: 0.5 }}
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
                viewport={{ once: false, amount: 0.5 }}
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
                    <p>
                      <strong>Director:</strong> {dbpediaInfo.director || "N/A"}
                    </p>
                    <p>
                      <strong>Main Actor:</strong>{" "}
                      {dbpediaInfo.starring || "N/A"}
                    </p>
                    <p>
                      <strong>Release Date:</strong>{" "}
                      {dbpediaInfo.releaseDate || "N/A"}
                    </p>
                    <p>
                      <strong>Abstract:</strong> {dbpediaInfo.abstract || "N/A"}
                    </p>
                    {dbpediaInfo.wikiPage && (
                      <p>
                        <a
                          href={dbpediaInfo.wikiPage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          More on Wikipedia
                        </a>
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
