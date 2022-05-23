import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBarAdministrador = ({ user }) => {
  return (
    <Navbar style={{ backgroundColor: "rgba(180, 190, 150)" }}>
      <div className="col-4">
        <Navbar.Brand className="anymo" href="/">
          ANYMO
        </Navbar.Brand>
      </div>

      <div className="col-4">
        <Nav style={{ justifyContent: "space-evenly" }}>
          <Nav.Item>
            <NavLink className="nav-link" to="/admin/momentos">
              Momentos
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/admin/vendedores">
              Vendedores
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/admin/compradores">
              Compradores
            </NavLink>
          </Nav.Item>
        </Nav>
      </div>
      <div className="col-4">
        <Nav style={{ justifyContent: "flex-end" }}>
          <NavDropdown
            style={{
              justifyContent: "center",
              backgroundColor: "rgba(220, 220, 220, 0.25)",
              borderRadius: "20px",
              marginRight: "10px",
              padding: "0 10px",
            }}
            title={user.nombre}
            id="nav-dropdown"
          >
            <Nav.Item>
              <NavLink className="nav-link" to="/admin/perfil">
                Perfil
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                style={{ color: "indianred" }}
                className="nav-link"
                to="/cerrarsesion"
              >
                Cerrar sesión
              </NavLink>
            </Nav.Item>
          </NavDropdown>
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBarAdministrador;
