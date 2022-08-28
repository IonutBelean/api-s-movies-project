import { Nav, Navbar, Container, Form, Button } from "react-bootstrap";
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
    <Navbar className={`${HeaderCSS.navbar} navbar`}>
      <Container className="d-flex justify-content-between">
        <Navbar.Brand
          as={Link}
          to="/"
          className={`${HeaderCSS.logomovies} logomovies`}
        >
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
        <Nav>
          <Nav.Link as={Link} to="/MoviesPopularity">
            Popular
          </Nav.Link>
          <Nav.Link as={Link} to="/MoviesTopRated">
            Top Rated
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
