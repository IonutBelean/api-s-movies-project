import { Container, Row, Col } from "react-bootstrap";
import TvMoviesCard from "./TvMoviesCard";

const TvMoviesCardList = (props) => {
  const { data } = props;

  return (
    <Container>
      <Row>
        {data.map((movie) => (
          <Col lg={3} md={4} className="mb-4" key={movie.id}>
            <TvMoviesCard
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

export default TvMoviesCardList;
