import React, { Component } from "react";
import { Form } from "react-bootstrap";

class Fecha extends Component {
  formatFecha = () => {
    const { fecha, editable } = this.props;

    var fechaFormateada, fechaEditableClass;

    if (editable) {
      fechaEditableClass = "align-middle text-center";
      if (fecha) {
        const today = new Date().toISOString();
        fechaFormateada = fecha.split("T")[0];
        if (fecha >= today) {
          fechaEditableClass += " red";
        }
      } else {
        fechaFormateada = "";
      }
    } else {
      if (fecha) {
        fechaFormateada = fecha.split("T")[0];
        const registroD = fechaFormateada.split("-")[2];
        const registroM = fechaFormateada.split("-")[1];
        const registroY = fechaFormateada.split("-")[0];
        fechaFormateada = registroD + "/" + registroM + "/" + registroY;
      } else {
        fechaFormateada = "Previo a Lanzamiento";
      }
    }

    return { fechaFormateada, fechaEditableClass };
  };

  render() {
    const { fechaFormateada, fechaEditableClass } = this.formatFecha();
    const { item, editable } = this.props;

    if (editable) {
      return (
        <Form.Control
          type="date"
          id="dateRegistroItem"
          className={fechaEditableClass}
          onChange={(e) => this.props.handleChange(e.target.value, item)}
          defaultValue={fechaFormateada}
        />
      );
    } else {
      return <div>{fechaFormateada}</div>;
    }
  }
}

export default Fecha;
