import { Container, Card, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      <h1 className="my-4 fw-bold">Welcome to my Page</h1>
      <Container className="my-4 d-flex justify-content-center align-items-center">
        <Row className="gx-5">
          <Col lg={4} md={6} xs={12}>
            <Card style={{ width: "18rem" }}>
              <Link to="/MoviesHorror">
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
              <Card.Img
                variant="top"
                src="https://i.ytimg.com/vi/1Ltt4IN1QAQ/maxresdefault.jpg"
              />
              <Card.Body>
                <Card.Title>Action</Card.Title>
                <Card.Text>Here you can find action movies</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} xs={12}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://www.osn.com/getattachment/watch/hot-topics/osn-blogs/May-2018/Laugh-out-loud-with-our-top-comedy-movies/ted.jpg.aspx"
              />
              <Card.Body>
                <Card.Title>Comedy</Card.Title>
                <Card.Text>Here you can find comedy movies</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
