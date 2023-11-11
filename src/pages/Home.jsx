import { Container, Card, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import HomeCSS from "./Home.module.css";

const Home = () => {
  const moviesGenres = [
    {
      id: 27,
      name: "Horror",
      image:
        "https://image.forskning.no/1451841.jpg?imageId=1451841&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=675",
    },
    {
      id: 28,
      name: "Action",
      image: "https://i.ytimg.com/vi/1Ltt4IN1QAQ/maxresdefault.jpg",
    },
    {
      id: 35,
      name: "Comedy",
      image:
        "https://www.osn.com/getattachment/watch/hot-topics/osn-blogs/May-2018/Laugh-out-loud-with-our-top-comedy-movies/ted.jpg.aspx",
    },
    {
      id: 12,
      name: "Adventure",
      image:
        "https://rare-gallery.com/thumbs/5002148-alpha-movie-2018-movies-movies-hd-4k.jpg",
    },
    {
      id: 16,
      name: "Animation",
      image: "https://cdn.wallpapersafari.com/28/22/ZOUMJE.png",
    },
    {
      id: 10752,
      name: "War",
      image: "https://wallpapercave.com/wp/wp6986377.jpg",
    },
    {
      id: 18,
      name: "Drama",
      image: "https://i.ytimg.com/vi/ACjaDBctb1Q/maxresdefault.jpg",
    },
    {
      id: 878,
      name: "Science Fiction",
      image:
        "https://i.pinimg.com/736x/70/bd/c3/70bdc3248a1632d548f3610f0fe32821.jpg",
    },
    {
      id: 37,
      name: "Western",
      image: "https://wallpaperaccess.com/full/2927219.jpg",
    },
  ];

  return (
    <Layout>
      <Container className={` h-100 d-flex flex-column p-4 text-center`}>
        <h1 className={`${HomeCSS.welcome} text-center`}>Best Movies</h1>
        <Row className="g-4">
          {moviesGenres.map((movieItem) => (
            <Col lg={4} md={6} xs={12} key={movieItem.id}>
              <Card
                className={`${HomeCSS.card} h-100 d-flex flex-column p-4 text-center`}
              >
                <Link to={`/MoviesGenres/${movieItem.id}`}>
                  <Card.Img
                    variant="top"
                    src={movieItem.image}
                    className={`${HomeCSS.img}`}
                  />
                  <Card.Body>
                    <Card.Title className={`${HomeCSS.title} `}>
                      {movieItem.name}
                    </Card.Title>
                    <Card.Text>
                      Here you can find {movieItem.name} movies
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
