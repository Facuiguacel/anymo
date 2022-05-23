import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import ObtenerMomentos from "../../componentes/comprador/momentosComprador";

const Styles = styled.div`
.overlay{
  background-color : #000;
}
.card{

    background-color: rgba(250, 150, 15, 0.08);

  background-size: cover;

}
.jumbo {
  background-color: rgba(200, 240, 255, 0.2);
  height: 30px;
  padding: 0px;
  text-align: center;
  background-size: cover;
}
.backgroundnav{
  background-color: #ff0000
  background-color: #ff000080
  background-color: #ff000060
  background-color: #ff000040
  background-color: #ff000020
  background-size: cover;

}
.divtitle{
  text-align:center;
}


  `;
export const Momentos = () => <Momento></Momento>;
function Momento() {
  return (
    <div>
      <Styles>
        <Container style={{ marginBottom: "3rem" }}>
          <Jumbo className="jumbo">
            <h1>Momentos</h1>
            <p>Regalate el momento que mereces</p>
          </Jumbo>
        </Container>
        <div>
          <ObtenerMomentos></ObtenerMomentos>
        </div>
      </Styles>
    </div>
  );
}
