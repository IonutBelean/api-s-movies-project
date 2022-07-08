import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div>
      {" "}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src="https://svgsilh.com/svg/147103-ffffff.svg"
              width="40"
              height="40"
              className="d-inline-block align-top me-3"
            />
            Movies
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/MoviesPopularity">
              Popular
            </Nav.Link>
            <Nav.Link as={Link} to="/MoviesTopRated">
              Top Rated
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
