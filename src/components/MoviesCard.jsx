import { Card } from "react-bootstrap";
import style from "./MoviesCard.module.css";

const MoviesCard = (props) => {
  const { id, votes, title, image, release } = props;

  return (
    <Card className="h-100 d-flex flex-column align-items-center justify-content-between">
      <Card.Img
        className={style.img}
        variant="top"
        src={`https://image.tmdb.org/t/p/w500${image}`}
      />
      <Card.Body className="d-flex flex-column align-items-center justify-content-between">
        <Card.Title className="text-center">{title}</Card.Title>
        <Card.Text className="text-center">Rating: {votes}</Card.Text>
        <Card.Text className="text-center">Release date: {release}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MoviesCard;
