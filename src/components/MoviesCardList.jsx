import { Container, Row, Col } from "react-bootstrap";
import MoviesCard from "./MoviesCard";

const MoviesCardList = (props) => {
  const { data } = props;

  return (
    <Container>
      <Row>
        {data.map((movie) => (
          <Col lg={3} md={4} xs={12} className="mb-4" key={movie.id}>
            <MoviesCard
              id={movie.id}
              title={movie.title}
              image={movie.image}
              votes={movie.votes}
              release={movie.release}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MoviesCardList;
