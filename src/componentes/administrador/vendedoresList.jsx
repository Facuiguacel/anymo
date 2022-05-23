import React, { Component } from "react";
import Tablez from "../comunes/table";
import Fecha from "../comunes/fecha";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class VendedoresList extends Component {
  columns = [
    { path: "nombre", label: "Nombre", sortable: true },
    { path: "email", label: "Email", sortable: true },
    { path: "telefono", label: "Telefono", sortable: true },
    {
      path: "fecha_registro",
      label: "Fecha de ingreso",
      sortable: true,
      content: (vendedor) => (
        <Fecha
          item={vendedor}
          fecha={vendedor.fecha_registro}
          editable={false}
        />
      ),
    },
    {
      key: "eliminar",
      label: "Eliminar",
      sortable: false,
      content: (vendedor) => (
        <Button
          onClick={() => this.props.onEliminar(vendedor)}
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
    const { vendedores, onSort, sortColumn } = this.props;

    return (
      <Tablez
        data={vendedores}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        headerStlyes={{ backgroundColor: "rgba(230, 174, 166)" }}
      />
    );
  }
}

export default VendedoresList;
