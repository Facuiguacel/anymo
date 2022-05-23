import React from "react";
import Joi from "joi-browser";
import swal from "sweetalert";
import { Container } from "react-bootstrap";
import Form from "../../componentes/comunes/form";
import {
  getMomentoById,
  cargarMomento,
  getFotosMomentoById,
  cargarFotoMomento,
} from "../../api/momentosService";
import auth from "../../api/authService";
import { toast } from "react-toastify";

class MomentoForm extends Form {
  state = {
    data: {
      _id: "",
      admin_id: auth.getCurrentUser()._id,
      nombre: "",
      frase: "",
      descripcion: "",
      precio: "",
      stock: "",
      habilitado: 0,
      fecha_registro: "",
    },
    images: [],
    errors: {},
  };

  schema = {
    _id: Joi.any(),
    admin_id: Joi.any(),
    nombre: Joi.string().label("Nombre").required(),
    frase: Joi.string().label("Frase"),
    descripcion: Joi.string().label("Descripcion"),
    precio: Joi.number().precision(2).positive().label("Precio").required(),
    stock: Joi.number().integer().positive().label("Stock").required(),
    habilitado: Joi.any(),
    fecha_registro: Joi.any(),
  };

  async componentDidMount() {
    await this.populateMomento();
  }

  async populateMomento() {
    try {
      const momentoId = this.props.match.params.id;
      if (momentoId === "nuevo") return;

      const { data: momento } = await getMomentoById(momentoId);
      const { data: images } = await getFotosMomentoById(momentoId);
      this.setState({ data: this.mapToViewModel(momento[0]) });
      this.setState({ images });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/NoMatch");
      else
        toast.error(
          "No pudimos conseguir el momento :(, por favor intenta mas tarde."
        );
    }
  }

  mapToViewModel(momento) {
    return {
      _id: momento._id,
      admin_id: momento.admin_id,
      nombre: momento.nombre,
      frase: momento.frase || "",
      descripcion: momento.descripcion || "",
      precio: momento.precio,
      stock: momento.stock,
      habilitado: momento.habilitado,
      fecha_registro: momento.fecha_registro,
    };
  }

  doSubmit = async () => {
    try {
      const { data, images } = this.state;
      const momento_id = await cargarMomento(data);
      await images.map((foto) => {
        const formdata = new FormData();
        formdata.append("file", foto.file);
        formdata.append("orden", images.indexOf(foto));
        return foto.file ? cargarFotoMomento(momento_id, formdata) : null;
      });
      swal({
        title: "Éxito",
        text: "El momento se ha guardado correctamente.",
        icon: "success",
      });
    } catch (error) {
      swal({
        title: "Error",
        text: "El momento no se pudo guardar.",
        icon: "error",
      });
    }
  };

  render() {
    return (
      <div>
        <Container className="col-lg-6 col-sm-9 col-12 mt-3">
          <form action="" onSubmit={this.handleSubmit}>
            {this.renderInput("nombre", "Nombre/Titulo", "text", true)}
            {this.renderTextarea("frase", "Frase", 200, 1)}
            {this.renderTextarea("descripcion", "Descripción")}
            {this.renderInput("precio", "Precio Suscripición")}
            {this.renderInput("stock", "Stock")}
            {this.renderFileUpload("foto", "Agregar imagen")}
            <div className="container">
              {this.state.images.map((foto) => (
                <img
                  key={foto.nombre}
                  className="col-lg-4 col-6"
                  style={{ padding: "2px" }}
                  src={
                    foto._id ? `http://localhost:3001/${foto.dir}` : foto.dir
                  }
                  alt=""
                />
              ))}
            </div>

            {this.renderSubmitButton("Guardar")}
          </form>
        </Container>
      </div>
    );
  }
}

export default MomentoForm;
