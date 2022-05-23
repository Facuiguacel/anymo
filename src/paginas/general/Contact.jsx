import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import Cerezo from "../../assets/img/Salmon2.jpg";
const Styles = styled.div`
.card{
 

}
.card-text{
  background-color:#C7BDA2
  color:black;
}
.card-header{
background-color: #6B8E23
background: url(${Cerezo}) no-repeat fixed bottom;
background-size: cover;
position: relative;

}
.navbar-brand , .navbar-nav .nav-link{
    color: #000;
&:hover{
    color: white;
}


}

`;

export const Contact = () => (
  <div>
    <Styles>
      <Card
        text="white"
        style={{ margin: "5%", width: "65rem", marginLeft: "22%" }}
      >
        <Card.Header>
          Estamos interesados en vender tus productos en nuestra plataforma
        </Card.Header>
        <Card.Body>
          <p style={{ color: "black" }}>Contactanos</p>
          <Card text="Black">
            <Card.Text style={{ width: "62rem" }}>
              Pagina de facebook :Dive in tempore
            </Card.Text>
            <Card.Text style={{ width: "62rem" }}>
              Mail : DiveInTempore@hotmail.com
            </Card.Text>
            <Card.Text style={{ width: "62rem" }}>
              Instagram : DiveInTempore
            </Card.Text>
          </Card>
        </Card.Body>
      </Card>
    </Styles>
  </div>
);
