import {
  Nav,
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HeaderCSS from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.search.value.trim();

    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <>
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
              className="d-inline-block align-top me-3"
            />
            <span className={`${HeaderCSS.logoname} d-inline-block`}>
              Movieland
            </span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={`${HeaderCSS.show}`}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`${HeaderCSS.collapse}`}
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
        <Container className={`${HeaderCSS.form_container}`}>
          <Form className={`${HeaderCSS.form}`} onSubmit={handleSearch}>
            <FormControl
              type="search"
              name="search"
              placeholder="Search movies..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
