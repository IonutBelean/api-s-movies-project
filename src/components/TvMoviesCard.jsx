import { Card } from "react-bootstrap";
import MoviesCardCSS from "./MoviesCard.module.css";
import { Link } from "react-router-dom";

const TvMoviesCard = (props) => {
  const { id, votes, title, image, release } = props;

  return (
    <Card
      className={`${MoviesCardCSS.card} h-100 d-flex flex-column p-4 text-center`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <Link to={`/TvMoviesDetails/${id}`}>
        <Card.Img
          className={MoviesCardCSS.img}
          variant="top"
          src={`https://image.tmdb.org/t/p/w500${image}`}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className={`${MoviesCardCSS.title} title`}>
            {title}
          </Card.Title>
          <Card.Text>
            Rating:{" "}
            <button className={`${MoviesCardCSS.grade} grade`}>{votes}</button>
          </Card.Text>
          <Card.Text>
            Release date:{" "}
            <button className={`${MoviesCardCSS.releasedate} releasedate`}>
              {release}
            </button>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default TvMoviesCard;
