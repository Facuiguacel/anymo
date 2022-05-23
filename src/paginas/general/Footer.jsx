/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  footer {
    background: #999999;
    padding: 10px 0;
    text-align: center;
  }
  footer a {
    color: #70726f;
    font-size: 20px;
    padding: 10px;
    border-right: 1px solid #70726f;
    transition: all 0.5s ease;
  }
  footer a:first-child {
    border-left: 1px solid #70726f;
  }
  footer a:hover {
    color: white;
  }
`;

const Box = styled.div`
  padding: 80px 60px;
  background: grey;

  bottom: 0;
  width: 100%;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  /* background: red; */
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    color: #80ffbd;
    transition: 200ms ease-in;
  }
`;

const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Footer = () => {
  return (
    <Styles>
      <Box>
        <Container>
          <Row>
            
            <Column>
              <Heading>Legales</Heading>
              <FooterLink href="#">Términos y Condiciones</FooterLink>
              <FooterLink href="#">Políticas de Privacidad</FooterLink>
              <FooterLink href="#">Política de Cambios y Devoluciones</FooterLink>
              <FooterLink href="#">Medios de Pago</FooterLink>
            </Column>
            <Column>
              <Heading>Unite a Anymo</Heading>
              <FooterLink href="#">Registrá tu empresa</FooterLink>
              <FooterLink href="#">Quiero trabajar en Anymo</FooterLink>
            </Column>
            <Column>
              <Heading>Arrepentimiento</Heading>
              <FooterLink href="#">Cancelar Suscripción</FooterLink>
              <FooterLink href="#">Devolver Producto</FooterLink>
            </Column>
            <Column>
              <Heading>Acerca de </Heading>
              <FooterLink href="#">Historia</FooterLink>
              <FooterLink href="#">Vision y Misión</FooterLink>
              <FooterLink href="#">Testimonios</FooterLink>
              <FooterLink href="#">Contacto</FooterLink>
            </Column>
            <Column>
              <Heading>Redes sociales</Heading>
              <footer>
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
              </footer>
            </Column>
          </Row>
        </Container>
      </Box>
    </Styles>
  );
};

export default Footer;
