import { Container, Row, Col } from "react-bootstrap";
import MoviesCard from "./MoviesCard";

const MoviesCardList = ({ data }) => {
  return (
    <Container>
      <Row>
        {data.map((movie) => (
          <Col lg={3} md={6} className="mb-4" key={movie.id}>
            <MoviesCard
              id={movie.id}
              title={movie.title}
              image={movie.poster_path || movie.image}
              votes={movie.vote_average ? movie.vote_average : movie.votes}
              release={
                movie.release_date || movie.first_air_date || movie.release
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MoviesCardList;
