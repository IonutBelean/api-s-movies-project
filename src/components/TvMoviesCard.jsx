import { Card } from "react-bootstrap";
import MoviesCardCSS from "./MoviesCard.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TvMoviesCard = (props) => {
  const { id, votes, title, image, release } = props;

  const roundedVotes = votes.toFixed(1);

  return (
    <Card
      className={`${MoviesCardCSS.card} h-100 d-flex flex-column p-4 text-center`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 120, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <Link to={`/TvMoviesDetails/${id}`}>
          <Card.Img
            className={MoviesCardCSS.img}
            variant="top"
            src={`https://image.tmdb.org/t/p/w500${image}`}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title className={`${MoviesCardCSS.title}`}>
              {title}
            </Card.Title>
            <Card.Text>
              Rating:{" "}
              <button className={`${MoviesCardCSS.grade}`}>
                {roundedVotes}
              </button>
            </Card.Text>
            <Card.Text>
              Release date:{" "}
              <button className={`${MoviesCardCSS.releasedate}`}>
                {release}
              </button>
            </Card.Text>
          </Card.Body>
        </Link>
      </motion.div>
    </Card>
  );
};

export default TvMoviesCard;
