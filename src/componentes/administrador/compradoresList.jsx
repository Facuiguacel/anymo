import React, { Component } from "react";
import Tablez from "../comunes/table";
import Fecha from "../comunes/fecha";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CompradoresList extends Component {
  columns = [
    { path: "nombre", label: "Nombre", sortable: true },
    { path: "apellido", label: "Apellido", sortable: true },
    { path: "email", label: "Email", sortable: true },
    { path: "telefono", label: "Telefono", sortable: true },
    {
      path: "fecha_registro",
      label: "Fecha de ingreso",
      sortable: true,
      content: (comprador) => (
        <Fecha
          item={comprador}
          fecha={comprador.fecha_registro}
          editable={false}
        />
      ),
    },
    {
      key: "eliminar",
      label: "Eliminar",
      sortable: false,
      content: (comprador) => (
        <Button
          onClick={() => this.props.onEliminar(comprador)}
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
    const { compradores, onSort, sortColumn } = this.props;

    return (
      <Tablez
        data={compradores}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        headerStlyes={{ backgroundColor: "#BDD2B6" }}
      />
    );
  }
}

export default CompradoresList;
