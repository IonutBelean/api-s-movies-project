import { Card } from "react-bootstrap";
import MoviesCardCSS from "./MoviesCard.module.css";
import { Link } from "react-router-dom";

const MoviesCard = (props) => {
  const { id, votes, title, image, release } = props;

  return (
    <Card
      className={`${MoviesCardCSS.card} h-100 d-flex flex-column p-4 text-center`}
    >
      <Link to={`/MoviesDetails/${id}`}>
        <Card.Img
          className={MoviesCardCSS.img}
          variant="top"
          src={`https://image.tmdb.org/t/p/w500${image}`}
        />
        <Card.Title className={`${MoviesCardCSS.title} title`}>
          {title}
        </Card.Title>
        <Card.Text className="">
          Rating:{" "}
          <button className={`${MoviesCardCSS.grade} grade`}>{votes}</button>
        </Card.Text>
        <Card.Text>
          Release date:{" "}
          <button className={`${MoviesCardCSS.releasedate} releasedate`}>
            {release}
          </button>
        </Card.Text>
      </Link>
    </Card>
  );
};

export default MoviesCard;
