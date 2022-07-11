import { Container, Card, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Home = () => {
  const moviesGenresId = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  return (
    <Layout>
      <h1 className="my-4 fw-bold text-center">Welcome to my Page</h1>
      <Container className="my-4 d-flex justify-content-center align-items-center">
        <Row className="gx-5">
          <Col lg={4} md={6} xs={12}>
            <Card style={{ width: "18rem" }}>
              <Link to="/MoviesGenres/27">
                <Card.Img
                  variant="top"
                  src="https://image.forskning.no/1451841.jpg?imageId=1451841&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=675"
                />
                <Card.Body>
                  <Card.Title>Horror</Card.Title>
                  <Card.Text>Here you can find horror movies</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col lg={4} md={6} xs={12}>
            <Card style={{ width: "18rem" }}>
              <Link to="/MoviesGenres/28">
                <Card.Img
                  variant="top"
                  src="https://i.ytimg.com/vi/1Ltt4IN1QAQ/maxresdefault.jpg"
                />
                <Card.Body>
                  <Card.Title>Action</Card.Title>
                  <Card.Text>Here you can find action movies</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col lg={4} md={6} xs={12}>
            <Card style={{ width: "18rem" }}>
              <Link to="/MoviesGenres/35">
                <Card.Img
                  variant="top"
                  src="https://www.osn.com/getattachment/watch/hot-topics/osn-blogs/May-2018/Laugh-out-loud-with-our-top-comedy-movies/ted.jpg.aspx"
                />
                <Card.Body>
                  <Card.Title>Comedy</Card.Title>
                  <Card.Text>Here you can find comedy movies</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
