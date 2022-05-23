import React from "react";

import { NavLink } from "react-router-dom";
import NavBarAdministrador from "../administrador/NavBarAdministrador";
import NavBarVendedor from "../vendedor/NavBarVendedor";
import { Navbar, Button, Nav, NavDropdown } from "react-bootstrap";
import { Link as Scroll } from "react-scroll";

const NavBar = ({ user }) => {
  if (user) {
    switch (user.rol) {
      case "comprador":
        return <DefaultNavBar user={user} />;
      case "vendedor":
        return <NavBarVendedor user={user} />;
      case "administrador":
        return <NavBarAdministrador user={user} />;
      default:
        return <DefaultNavBar />;
    }
  } else {
    return <DefaultNavBar />;
  }
};

const DefaultNavBar = ({ user }) => {
  return (
    <Navbar
      className="navbar"
      style={{
        backgroundColor: "rgba(255, 247, 249, 0.4)",

        // backgroundColor: "rgba(255, 212, 163, 0.4) ",
        justifyContent: "center",
        background: "cover",
      }}
    >
      <div className="col-4">
        <Navbar.Brand href="/">
          <div className="anymo">ANYMO</div>
        </Navbar.Brand>
      </div>
      <div className="col">
        {!user && (
          <Nav style={{ justifyContent: "space-evenly" }}>
            <Scroll to="place-to-visit" smooth={true} offset={-100}>
              <Nav.Link>Beneficios</Nav.Link>
            </Scroll>
            <Scroll to="place-to-visit2" smooth={true} offset={-80}>
              <Nav.Link>Como Funciona</Nav.Link>
            </Scroll>
            <Scroll to="place-to-visit3" smooth={true} offset={-60}>
              <Nav.Link>Momentos destacados</Nav.Link>
            </Scroll>
            <Scroll to="place-to-visit4" smooth={true} offset={-80}>
              <Nav.Link>Marcas</Nav.Link>
            </Scroll>
            <Scroll to="place-to-visit5" smooth={true} offset={-60}>
              <Nav.Link>Testimonios</Nav.Link>
            </Scroll>
          </Nav>
        )}

        {user && (
          <Nav style={{ justifyContent: "right" }}>
            <Nav.Item>
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/momentos">
                Momentos
              </NavLink>
            </Nav.Item>
          </Nav>
        )}
      </div>

      <div>
        {!user && (
          <Nav style={{ justifyContent: "right" }}>
            <Nav.Item>
              <NavLink className="nav-link pr-1" to="/iniciarsesion">
                <Button
                  style={{ borderRadius: "14px" }}
                  className="btn-sm"
                  variant="outline-danger"
                  type="button"
                >
                  Iniciar Sesion
                </Button>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link pl-1" to="/registrarse">
                <Button
                  style={{ borderRadius: "14px" }}
                  className=" btn-sm"
                  variant="danger"
                  type="button"
                >
                  REGISTRARSE
                </Button>
              </NavLink>
            </Nav.Item>
          </Nav>
        )}
        {user && (
          <Nav
            style={{
              justifyContent: "center",
              backgroundColor: "rgba(220, 220, 220, 0.25)",
              borderRadius: "20px",
              marginRight: "25px",
              padding: "0 10px",
            }}
          >
            <NavDropdown
              title={user.nombre}
              id="nav-dropdown"
              className="navdrop"
            >
              <Nav.Item>
                <NavLink className="nav-link" to="/perfil/mis-datos">
                  Mis Datos
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/perfil/mis-suscripciones">
                  Mis Suscripciones
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  className="nav-link"
                  style={{ color: "indianred", fontSize: "smaller" }}
                  to="/cerrarsesion"
                >
                  Cerrar sesión
                </NavLink>
              </Nav.Item>
            </NavDropdown>
          </Nav>
        )}
      </div>
    </Navbar>
  );
};

export default NavBar;
