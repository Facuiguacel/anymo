import React from "react";
import Joi from "joi-browser";
import swal from "sweetalert";
import { Container } from "react-bootstrap";
import Form from "../../componentes/comunes/form";
import { getVendedorById, guardarVendedor } from "../../api/usuariosService";

class VendedorForm extends Form {
  state = {
    data: {
      _id: "",
      nombre: "",
      email: "",
      telefono: "",
      fecha_registro: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.any(),
    nombre: Joi.string().label("Nombre").required(),
    email: Joi.string().label("Email").required(),
    telefono: Joi.string().label("Teléfono").required(),
    fecha_registro: Joi.any(),
  };

  async componentDidMount() {
    await this.populateVendedor();
  }

  async populateVendedor() {
    try {
      const vendedorId = this.props.match.params.id;
      if (vendedorId === "nuevo") return;

      const { data: vendedor } = await getVendedorById(vendedorId);
      this.setState({ data: this.mapToViewModel(vendedor[0]) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/NoMatch");
    }
  }

  mapToViewModel(vendedor) {
    return {
      _id: vendedor._id,
      nombre: vendedor.nombre,
      email: vendedor.email,
      telefono: vendedor.telefono,
      fecha_registro: vendedor.fecha_registro,
    };
  }

  doSubmit = async () => {
    // Hacer bien. Si hubo un error mostrarlo.
    try {
      await guardarVendedor(this.state.data);
      swal({
        title: "Éxito",
        text: "El vendedor se a registrado correctamente y se le asigno una contraseña aleatoria.",
        icon: "success",
      });
    } catch (error) {
      swal({
        title: "Error",
        text: "El vendedor no se pudo registrar.",
        icon: "error",
      });
    }
  };

  render() {
    return (
      <div>
        <Container className="col-md-6 col-12 mt-3">
          <form action="" onSubmit={this.handleSubmit}>
            {this.renderInput("nombre", "Nombre")}
            {this.renderInput("email", "Email")}
            {this.renderInput("telefono", "Teléfono")}
            {this.renderSubmitButton("Guardar", "btn-warning")}
          </form>
        </Container>
      </div>
    );
  }
}

export default VendedorForm;
