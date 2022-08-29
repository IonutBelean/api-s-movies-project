import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderCSS from "./Header.module.css";

const Header = () => {
  const handleHomeClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Navbar className={`${HeaderCSS.navbar} navbar`} expand="lg">
      <Container className="d-flex justify-content-around">
        <div>
          <Navbar.Brand as={Link} to="/" className={`${HeaderCSS.logomovies}`}>
            <img
              alt=""
              src="https://svgsilh.com/svg/147103-ffffff.svg"
              width="40"
              height="40"
              className={` d-inline-block align-top me-3`}
              onClick={handleHomeClick}
            />
            Movieland
          </Navbar.Brand>
        </div>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`${HeaderCSS.category}`}>
              <Nav.Link as={Link} to="/TvMoviesTopRated">
                Top Rated Tv Series
              </Nav.Link>
              <Nav.Link as={Link} to="/TvMoviesPopularity">
                Popular Tv Series
              </Nav.Link>
              <Nav.Link as={Link} to="/MoviesTopRated">
                Top Rated Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/MoviesPopularity">
                Popular Movies
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
