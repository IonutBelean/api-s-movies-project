import { useParams } from "react-router-dom";
import { getTvMoviesDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import TvMoviesDetailsCSS from "./TvMoviesDetails.module.css";
import { motion } from "framer-motion";
import { useDBpedia } from "../utils/hooks/useDBpedia";

const TvMoviesDetails = () => {
  const { movieId } = useParams();
  const data = useFetch(getTvMoviesDetailsEndpoint(movieId));
  const {
    original_name,
    backdrop_path,
    overview,
    status,
    tagline,
    first_air_date,
  } = data || {};

  const { dbpediaData, loading: loadingDbpedia } = useDBpedia(
    original_name,
    first_air_date?.split("-")[0] || null,
  );

  const renderPersons = (persons) => {
    if (!persons || persons.length === 0) return null;
    return persons.map((p, i) => (
      <span key={i}>
        {p.name}
        {i < persons.length - 1 ? ", " : ""}
      </span>
    ));
  };

  const renderStrings = (arr) => {
    if (!arr || arr.length === 0) return null;
    return arr.join(", ");
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
                ) : dbpediaData ? (
                  <>
                    {dbpediaData.director?.length > 0 && (
                      <p>
                        <strong>Director:</strong>{" "}
                        {renderPersons(dbpediaData.director)}
                      </p>
                    )}
                    {dbpediaData.starring?.length > 0 && (
                      <p>
                        <strong>Main Actor:</strong>{" "}
                        {renderPersons(dbpediaData.starring)}
                      </p>
                    )}
                    {dbpediaData.producer?.length > 0 && (
                      <p>
                        <strong>Producer:</strong>{" "}
                        {renderPersons(dbpediaData.producer)}
                      </p>
                    )}
                    {dbpediaData.writer?.length > 0 && (
                      <p>
                        <strong>Writer:</strong>{" "}
                        {renderPersons(dbpediaData.writer)}
                      </p>
                    )}
                    {dbpediaData.genre?.length > 0 && (
                      <p>
                        <strong>Genre:</strong>{" "}
                        {renderPersons(dbpediaData.genre)}
                      </p>
                    )}
                    {dbpediaData.releaseDate && (
                      <p>
                        <strong>Release Date:</strong> {dbpediaData.releaseDate}
                      </p>
                    )}
                    {dbpediaData.runtime && (
                      <p>
                        <strong>Runtime:</strong> {dbpediaData.runtime}
                      </p>
                    )}
                    {dbpediaData.budget && (
                      <p>
                        <strong>Budget:</strong> {dbpediaData.budget}
                      </p>
                    )}
                    {dbpediaData.gross && (
                      <p>
                        <strong>Box Office:</strong> {dbpediaData.gross}
                      </p>
                    )}
                    {dbpediaData.language?.length > 0 && (
                      <p>
                        <strong>Language:</strong>{" "}
                        {renderStrings(dbpediaData.language)}
                      </p>
                    )}
                    {dbpediaData.country?.length > 0 && (
                      <p>
                        <strong>Country:</strong>{" "}
                        {renderStrings(dbpediaData.country)}
                      </p>
                    )}
                    {dbpediaData.abstract && (
                      <p>
                        <strong>Abstract:</strong> {dbpediaData.abstract}
                      </p>
                    )}
                    {!dbpediaData.abstract &&
                      !dbpediaData.director?.length &&
                      !dbpediaData.starring?.length &&
                      !dbpediaData.releaseDate &&
                      !dbpediaData.producer?.length &&
                      !dbpediaData.writer?.length &&
                      !dbpediaData.genre?.length && (
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
