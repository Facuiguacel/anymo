import React from "react";

import { Button, Container, ListGroup } from "react-bootstrap";

import { Card } from "react-bootstrap";
import img11 from "../../assets/Chandom.jpg";
import img12 from "../../assets/Guitarra.jpg";

import styled from "styled-components";

import ButtonGroup from "react-bootstrap/ButtonGroup";

const Styles = styled.div`
.card-title{


}
  .overlay{
    background-color : #000;

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
}
.nav-dropdown-menu {
  right: 0;
  left: auto;
}
  
.card{

  background-color: rgba(120, 114, 75,0.5);
 


}
.buton{
  margin-left:20px;
}
.navdropdownitem{
  background-color: #ff0000
  background-color: #ff020080
  background-color: #ff020060
  background-color: #ff020040
  background-color: #ff020020
}
.divtitle{
  margin-left:70px;
}
.Alert{
margin:35%;
}
  `;
export const SelecionarProductos = () => <Selecionar></Selecionar>;
function Selecionar() {
  function alertClicked() {
    alert("Productos Cargados");
  }
  return (
    <div>
      <ListGroup style={{ width: "55rem" }} defaultActiveKey="#link1">
        <ListGroup.Item>Productos</ListGroup.Item>
        <ListGroup.Item action href="#link1 " disabled variant="info">
          Deselecionar
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={alertClicked}
          variant="info"
          type="submit"
          href="/Administrador/IngresarMomento"
          to="/MisProductos"
        >
          Cargar
        </ListGroup.Item>
      </ListGroup>

      <Styles>
        <Card style={{ width: "15rem" }}>
          <p1 className="divtitle">Chandom rose</p1>
          <Card.Img variant="top" src={img11} />
          <Card.Body>
            <Card.Text></Card.Text>
            <div>Chandom Rose</div>
            <p1>Id:37</p1>
            <Container></Container>
            <p1>Precio:5000$</p1>
            <Container> </Container>
            <p1>Cantidad:5 unidades</p1>

            <Button id="1" variant="warning">
              Selecionar
            </Button>

            <ButtonGroup></ButtonGroup>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "15rem", margin: "-30.1rem", marginLeft: "40rem" }}
        >
          <p1 className="divtitle">Scarlet Red</p1>
          <Card.Img variant="top" src={img12} />
          <Card.Body>
            <Card.Text></Card.Text>
            <div>Scarlet Red</div>
            <p1>Id:5</p1>
            <Container></Container>
            <p1>Precio:20000$</p1>
            <Container> </Container>
            <p1>Cantidad:5 unidades</p1>
            <Button id="1" variant="warning">
              Selecionar
            </Button>
            <ButtonGroup></ButtonGroup>
          </Card.Body>
        </Card>
        <Container></Container>
      </Styles>
    </div>
  );
}
