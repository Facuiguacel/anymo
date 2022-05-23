import React, { Component } from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import SalmonJumbo from "../../assets/Salmon2.jpg";
import CardRed from "../../assets/Carta.jpg";

const Styles = styled.div`
.jumbo{
 background-color:	#2E8B57
 background: url(${SalmonJumbo}) no-repeat fixed bottom;
 width:100%;
 height: 30px;
 padding:0px;
 text-align: center;
 background-size: cover;

}
.card{
 background-color: #DC143C;
 background: url(${CardRed}) no-repeat fixed bottom;
 width:100%;
 height: 25px;
 padding:0px;
 text-align: center;
 background-size: cover;
}
`;

class Jumbotron2 extends Component {
  render() {
    return (
      <Styles>
        <Jumbo className="jumbo">
          <h1 style={{ width: "25rem" }}>Dive In Tempore</h1>{" "}
          <Container>
            <div className="card">Sumergite en un momento</div>
          </Container>
        </Jumbo>
      </Styles>
    );
  }
}
export default Jumbotron2;
