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
    <Navbar
      className={`${HeaderCSS.navbar}`}
      expand="lg"
      collapseOnSelect
      sticky="top"
    >
      <Container className={`${HeaderCSS.container}`}>
        <Navbar.Brand
          as={Link}
          to="/"
          className={`${HeaderCSS.logomovies}`}
          onClick={handleHomeClick}
        >
          <img
            alt=""
            src="https://svgsilh.com/svg/147103-ffffff.svg"
            width="40"
            height="40"
            className={` d-inline-block align-top me-3`}
          />

          <span className={`${HeaderCSS.logoname} d-inline-block`}>
            Movieland
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={`${HeaderCSS.show} `}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`${HeaderCSS.collapse} `}
        >
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
      </Container>
    </Navbar>
  );
};

export default Header;
