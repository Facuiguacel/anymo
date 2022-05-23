import React from "react";
import Form from "../../componentes/comunes/form";
import Joi from "joi-browser";
import {
  getProductoById,
  cargarProducto,
  getFotosProductoById,
  cargarFotoProducto,
} from "../../api/productosService";
import swal from "sweetalert";
import { Container } from "react-bootstrap";
import auth from "../../api/authService";

class ProductoForm extends Form {
  state = {
    data: {
      _id: "",
      vendedor_id: auth.getCurrentUser()._id,
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      habilitado: 1,
      fecha_registro: "",
    },
    images: [],
    errors: {},
  };

  schema = {
    _id: Joi.any(),
    vendedor_id: Joi.any(),
    nombre: Joi.string().label("Nombre").required(),
    descripcion: Joi.string().label("Descripcion"),
    precio: Joi.number().precision(2).positive().label("Precio").required(),
    stock: Joi.number().integer().positive().label("Stock").required(),
    habilitado: Joi.any(),
    fecha_registro: Joi.any(),
  };

  async componentDidMount() {
    await this.populateProducto();
  }

  async populateProducto() {
    try {
      const productoId = this.props.match.params.id;
      if (productoId === "nuevo") return;

      const { data: producto } = await getProductoById(productoId);
      const { data: images } = await getFotosProductoById(productoId);
      this.setState({ data: this.mapToViewModel(producto[0]) });
      this.setState({ images });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/NoMatch");
    }
  }

  mapToViewModel(producto) {
    return {
      _id: producto._id,
      vendedor_id: producto.vendedor_id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      habilitado: producto.habilitado,
      fecha_registro: producto.fecha_registro,
    };
  }

  doSubmit = async () => {
    try {
      const { data, images } = this.state;
      const producto_id = await cargarProducto(data);
      await images.map((foto) => {
        const formdata = new FormData();
        formdata.append("file", foto.file);
        formdata.append("orden", images.indexOf(foto));
        return foto.file ? cargarFotoProducto(producto_id, formdata) : null;
      });
      swal({
        title: "Éxito",
        text: "El producto se ha guardado correctamente.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "Error",
        text: "El producto no se pudo guardar.",
        icon: "error",
      });
    }

    //this.props.history.push("/vendedor/misproductos");
  };

  render() {
    return (
      <div>
        <Container className="col-sm-6 col-12 mt-3">
          <form action="" onSubmit={this.handleSubmit}>
            {this.renderInput("nombre", "Nombre", "text", true)}
            {this.renderTextarea("descripcion", "Descripción")}
            {this.renderInput("precio", "Precio")}
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

export default ProductoForm;
