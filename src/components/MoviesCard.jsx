import { Card } from "react-bootstrap";
import MoviesCardCSS from "./MoviesCard.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MoviesCard = (props) => {
  const { id, votes, title, image, release } = props;

  const roundedVotes = votes ? votes.toFixed(1) : "N/A";
  const releaseDate = release || "Unknown";

  const imagePath = image
    ? `https://image.tmdb.org/t/p/w500${image}`
    : "/nophoto.png";

  return (
    <Card
      className={`${MoviesCardCSS.card} h-100 d-flex flex-column p-4 text-center`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 120, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <Link to={`/MoviesDetails/${id}`}>
          <Card.Img
            className={`${MoviesCardCSS.boximg} boximg`}
            variant="top"
            alt="Movie Poster"
            src={imagePath}
          />
        </Link>
      </motion.div>
      <Card.Body className="d-flex flex-column p-0">
        <Card.Title className={`${MoviesCardCSS.title}`}>{title}</Card.Title>
        <Card.Text className={`${MoviesCardCSS.text}`}>
          Rating:
          <button className={`${MoviesCardCSS.grade}`}>{roundedVotes}</button>
        </Card.Text>
        <Card.Text className={`${MoviesCardCSS.text}`}>
          Release date:{" "}
          <button className={`${MoviesCardCSS.releasedate}`}>
            {releaseDate}
          </button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MoviesCard;
