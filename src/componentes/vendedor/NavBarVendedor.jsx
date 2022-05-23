import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

const NavBarVendedor = ({ user }) => {
  return (
    <Navbar style={{ backgroundColor: "rgba(220, 164, 156)" }}>
      <div className="col-4">
        <Navbar.Brand className="anymo" href="/">
          ANYMO
        </Navbar.Brand>
      </div>
      <div className="col-4">
        <Nav style={{ justifyContent: "space-evenly" }}>
          <Nav.Item>
            <NavLink className="nav-link" to="/vendedor/misproductos">
              Mis productos
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
              marginRight: "20px",
              padding: "0 10px",
            }}
            title={user.nombre}
            id="nav-dropdown"
          >
            <Nav.Item>
              <NavLink className="nav-link" to="/vendedor/perfil">
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

    // <Nav className="navbar navbar-expand-md navbar-light bg-light">
    //   <Link className="navbar-brand" to="/">
    //     𝒟𝒾𝓋ℯ 𝒾𝓃 𝓉ℯ𝓂𝓅ℴ𝓇ℯ
    //   </Link>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-bs-toggle="collapse"
    //     data-bs-target="#navbarCollapse"
    //     aria-controls="navbarCollapse"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarCollapse">
    //     <ul className="navbar-nav ml-auto me-auto mb-2 mb-md-0">
    //       <Nav.Item>
    //         <NavDropdown title={user.nombre} id="basic-nav-dropdown">
    //           <Nav.Item>
    //             <NavLink className="nav-link" to="/vendedor/misproductos">
    //               Mis productos
    //             </NavLink>
    //           </Nav.Item>
    //           <Nav.Item>
    //             <NavLink className="nav-link" to="/vendedor/perfil">
    //               Perfil
    //             </NavLink>
    //           </Nav.Item>
    //           <Nav.Item>
    //             <NavLink className="nav-link" to="/cerrarsesion">
    //               Cerrar sesión
    //             </NavLink>
    //           </Nav.Item>
    //         </NavDropdown>
    //       </Nav.Item>
    //     </ul>
    //   </div>
    // </Nav>
  );
};

export default NavBarVendedor;
