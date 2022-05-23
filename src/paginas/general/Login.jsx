import React from "react";
import Joi from "joi-browser";
import { Container } from "react-bootstrap";
import Form from "../../componentes/comunes/form";
import auth from "../../api/authService";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().max(100).label("Email").required(),
    password: Joi.string().max(50).label("Contraseña").required(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      const { state } = this.props.location;
      switch (auth.getCurrentUser().rol) {
        case "comprador":
          window.location = state ? state.from.pathname : "/";
          break;
        case "vendedor":
          window.location = state
            ? state.from.pathname
            : "/vendedor/misproductos";
          break;
        case "administrador":
          window.location = state ? state.from.pathname : "/admin/momentos";
          break;
        default:
          window.location = state ? state.from.pathname : "/";
      }
      // Una vez logueado lo redirige a la pagina en la que estaba.
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { state } = this.props.location;
    if (auth.getCurrentUser())
      window.location = state ? state.from.pathname : "/";
    return (
      <div>
        <Container className="col-lg-4 col-sm-6 col-11 my-4">
          <form action="" onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email", "text", true)}
            {this.renderInput("password", "Contraseña", "Password")}
            {this.renderSubmitButton("Iniciar Sesión")}
          </form>
        </Container>
      </div>
    );
  }
}
export default Login;
