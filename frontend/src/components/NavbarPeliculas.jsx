import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarPeliculas() {
  return (
    <Navbar
      expand="lg"
      className="mt-3 shadow-sm rounded-pill px-3"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Container>

        <Navbar.Brand as={Link} to="/media" className="fw-bold">
          🎬 Películas IUD
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto">

            <Nav.Link as={Link} to="/home">Inicio</Nav.Link>

            <Nav.Link as={Link} to="/media">Películas</Nav.Link>

            <Nav.Link as={Link} to="/productora">Productoras</Nav.Link>

            <Nav.Link as={Link} to="/genero">Géneros</Nav.Link>

            <Nav.Link as={Link} to="/tipo">Tipos</Nav.Link>

            <Nav.Link as={Link} to="/director">Directores</Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavbarPeliculas;

