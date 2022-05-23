import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./api/authService";
import ProtectedRoute from "./componentes/comunes/protectedRoute";
import Logout from "./componentes/general/logout";
import NavBar from "./componentes/general/NavBar";
import { About } from "./paginas/general/About";
import Home from "./paginas/general/Home";
import Login from "./paginas/general/Login";
import Momento from "./paginas/general/Momento";
import { Momentos } from "./paginas/general/Momentos";
import { NoMatch } from "./paginas/general/NoMatch";
import Registrarse from "./paginas/general/Registrarse";
import MisProductos from "./paginas/vendedor/MisProductos";
import ProductoForm from "./paginas/vendedor/productoForm";
import MomentosAdmin from "./paginas/administrador/MomentosAdmin";
import MomentoForm from "./paginas/administrador/momentoForm";
import VendedorForm from "./paginas/administrador/vendedorForm";
import VendedoresAdmin from "./paginas/administrador/VendedoresAdmin";
import CompradoresAdmin from "./paginas/administrador/CompradoresAdmin";
import PerfilComprador from "./paginas/comprador/PerfilComprador";
import Suscribirse from "./paginas/comprador/Suscribirse";
import LandingPage from "./paginas/general/LandingPage";
import SuscripcionesComprador from "./paginas/comprador/SuscripcionesComprador";
import Footer from "./paginas/general/Footer";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

library.add(fas, fab); // Iconos Fontawesome

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />

        <div style={{ minHeight: "800px" }}>
          <Switch>
            {/* General */}
            {!user && <Route path="/inicio" component={LandingPage} />}
            {user && <Route path="/inicio" component={Home} />}
            <Route path="/iniciarsesion" component={Login} />
            <Route path="/registrarse" component={Registrarse} />
            <Route path="/cerrarsesion" component={Logout} />
            <Route path="/about" component={About} />
            <Route exact path="/momentos" component={Momentos} />
            {/* Comprador (logueado) */}
            <ProtectedRoute
              path="/perfil/mis-datos"
              component={PerfilComprador}
            />
            <ProtectedRoute
              path="/perfil/mis-suscripciones"
              component={SuscripcionesComprador}
            />
            <ProtectedRoute
              path="/momentos/suscribirse/:idMomento"
              component={Suscribirse}
            />
            <Route path="/momentos/:idMomento" component={Momento} />
            {/* Vendedor */}
            <ProtectedRoute
              path="/vendedor/misproductos"
              component={MisProductos}
            />
            <ProtectedRoute
              path="/vendedor/producto/:id"
              component={ProductoForm}
            />
            <Redirect exact from="/vendedor" to="/vendedor/misproductos" />
            {/* Admin */}
            <ProtectedRoute
              exact
              path="/admin/momentos"
              component={MomentosAdmin}
            />
            <ProtectedRoute path="/admin/momento/:id" component={MomentoForm} />
            <ProtectedRoute
              path="/admin/vendedores"
              component={VendedoresAdmin}
            />
            <ProtectedRoute
              path="/admin/vendedor/:id"
              component={VendedorForm}
            />
            <ProtectedRoute
              path="/admin/compradores"
              component={CompradoresAdmin}
            />
            <Redirect from="/perfil" exact to="/perfil/mis-suscripciones" />
            <Redirect from="/admin" exact to="/admin/momentos" />
            <Redirect from="/login" to="iniciarsesion" />
            <Redirect exact path="/" to="/inicio" />
            <Route component={NoMatch} />
          </Switch>
        </div>
        {/* <Footer /> */}
        {(!user || user.rol === "comprador") && <Footer />}
      </React.Fragment>
    );
  }
}

export default App;
