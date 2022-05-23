import React from "react";
import Joi from "joi-browser";
import { Container } from "react-bootstrap";
import Form from "../../componentes/comunes/form";
import auth from "../../api/authService";
import { guardarComprador } from "../../api/usuariosService";

class Registrarse extends Form {
  state = {
    data: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      // confirmpassword: "",
      telefono: "",
    },
    errors: {},
  };

  schema = {
    nombre: Joi.string()
      .regex(/^[A-Za-z,ñ,á,é,í,ó,ú, ]+$/, "alpha")
      .min(2)
      .max(50)
      .required()
      .label("Nombre")
      .options({
        language: {
          any: {
            required: "requerido",
            empty: "requerido",
          },
          string: {
            base: "solo puede contener letras y espacios",
            regex: { name: "solo puede contener letras" },
            min: "debe tener un minimo de 2 caracteres",
            max: "no puede tener mas de 50 caracteres",
          },
        },
      }),
    apellido: Joi.string()
      .regex(/^[A-Za-z,ñ,á,é,í,ó,ú, ]+$/, "alpha")
      .min(2)
      .max(50)
      .required()
      .label("Apellido")
      .options({
        language: {
          any: {
            required: "requerido",
            empty: "requerido",
          },
          string: {
            base: "solo puede contener letras y espacios",
            regex: { name: "solo puede contener letras" },
            min: "debe tener un minimo de 2 letras",
            max: "no puede tener mas de 50 letras",
          },
        },
      }),
    email: Joi.string()
      .email()
      .label("Email")
      .required()
      .options({
        language: {
          any: { required: "requerido", empty: "requerido" },
          string: {
            email: "no valido",
          },
        },
      }),
    password: Joi.string()
      .regex(/^[A-Za-z,0-9,!,$,%,?,_,.,@]+$/, "contra")
      .min(4)
      .max(30)
      .label("Contraseña")
      .required()
      .options({
        language: {
          any: { required: "requerida", empty: "requerida" },
          string: {
            regex: {
              name: "solo puede contener letras, numeros, y/o los siguientes caracteres: ! $ . % ? @ _",
            },
            min: "debe tener mas de 4 caracteres",
            max: "debe tener menos de 30 caracteres",
          },
        },
      }),
    // confirmpassword: Joi.string().min(4).max(30).label("Contraseña").required(),
    telefono: Joi.string()
      .regex(/^[0-9,+, ]+$/, "num")
      .min(8)
      .max(18)
      .label("Telefono")
      .allow(null, "")
      .options({
        language: {
          string: {
            regex: { name: "invalido" },
            min: "debe tener un minimo de 8 digitos",
            max: "no puede tener mas de 18 digitos",
          },
        },
      }),
  };

  doSubmit = async () => {
    try {
      const usuario = { ...this.state.data };
      if (usuario.telefono === "") usuario.telefono = null;
      const response = await guardarComprador(usuario);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
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
            {this.renderInput("nombre", "Nombre *", "text", true)}
            {this.renderInput("apellido", "Apellido *")}
            {this.renderInput("email", "Email *")}
            {this.renderInput("password", "Contraseña *", "Password")}
            {/* {this.renderInput(
              "confirmpassword",
              "Confirmar contraseña *",
              "Password"
            )} */}
            {this.renderInput("telefono", "Telefono")}
            {this.renderSubmitButton("Registrarse")}
          </form>
        </Container>
      </div>
    );
  }
}
export default Registrarse;
