import React, { Component } from "react";
import Tablez from "../comunes/table";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fecha from "../comunes/fecha";
import EnablerSwitch from "../comunes/enablerSwitch";
import { Link } from "react-router-dom";

class MomentosList extends Component {
  columns = [
    {
      path: "_id",
      label: "Codigo",
      sortable: true,
      customClassName: "align-middle text-left",
    },
    {
      path: "foto_dir",
      label: "Imagen principal",
      sortable: false,
      customClassName: "align-middle text-center p-0",
      content: (momento) => (
        <img
          style={{ maxHeight: "64px", maxWidth: "128px" }}
          src={
            momento.foto_dir
              ? `http://localhost:3001/${momento.foto_dir}`
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
      path: "fecha_registro",
      label: "Fecha de ingreso",
      sortable: true,
      content: (momento) => (
        <Fecha item={momento} fecha={momento.fecha_registro} editable={false} />
      ),
    },
    {
      path: "habilitado",
      label: "Habilitado",
      sortable: true,
      content: (momento) => (
        <EnablerSwitch item={momento} onChange={this.props.onHabilitar} />
      ),
    },
    {
      key: "modificar",
      label: "Modificar",
      sortable: false,
      content: (momento) => (
        <Link to={`/admin/momento/${momento._id}`}>
          <Button
            //onClick={() => this.props.onModificar(momento)}
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
      content: (momento) => (
        <Button
          onClick={() => this.props.onEliminar(momento)}
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
    const { momentos, onSort, sortColumn } = this.props;

    return (
      <Tablez
        data={momentos}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        headerStlyes={{ backgroundColor: "rgba(190, 200, 220)" }}
      />
    );
  }
}

export default MomentosList;
