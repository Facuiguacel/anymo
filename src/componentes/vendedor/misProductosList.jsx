import React, { Component } from "react";
import Tablez from "../comunes/table";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fecha from "../comunes/fecha";
import EnablerSwitch from "../comunes/enablerSwitch";
import { Link } from "react-router-dom";

class MisProductosList extends Component {
  columns = [
    {
      path: "_id",
      label: "Codigo",
      sortable: false,
    },
    {
      path: "foto_dir",
      label: "Foto portada",
      sortable: false,
      customClassName: "align-middle text-center p-0",
      content: (producto) => (
        <img
          style={{ maxHeight: "64px", maxWidth: "128px" }}
          src={
            producto.foto_dir
              ? `http://localhost:3001/${producto.foto_dir}`
              : null
          }
          alt="Sin foto"
        />
      ),
    },
    { path: "nombre", label: "Nombre", sortable: true },
    { path: "precio", label: "Precio (Pesos)", sortable: true },
    { path: "stock", label: "Stock", sortable: true },
    {
      path: "habilitado",
      label: "Habilitado",
      sortable: true,
      content: (producto) => (
        <EnablerSwitch item={producto} onChange={this.props.onHabilitar} />
      ),
    },
    {
      path: "fecha_registro",
      label: "Fecha de ingreso",
      sortable: true,
      content: (producto) => (
        <Fecha
          item={producto}
          fecha={producto.fecha_registro}
          editable={false}
        />
      ),
    },
    {
      key: "modificar",
      label: "Modificar",
      sortable: false,
      content: (producto) => (
        <Link to={`/vendedor/producto/${producto._id}`}>
          <Button
            //onClick={() => this.props.onModificar(producto)}
            variant="outline-primary"
            className="align-middle"
            style={{ maxWidth: "4rem" }}
          >
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </Button>
        </Link>
      ),
    },
    {
      key: "eliminar",
      label: "Eliminar",
      sortable: false,
      content: (producto) => (
        <Button
          onClick={() => this.props.onEliminar(producto)}
          variant="danger"
          className="align-middle"
          style={{ maxWidth: "4rem" }}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </Button>
      ),
    },
  ];

  render() {
    const { productos, onSort, sortColumn } = this.props;

    return (
      <Tablez
        data={productos}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        headerStlyes={{ backgroundColor: "rgba(190, 200, 220)" }}
      />
    );
  }
}

export default MisProductosList;
