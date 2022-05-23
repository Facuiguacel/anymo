/* eslint-disable jsx-a11y/anchor-is-valid */
import Carousel from "react-bootstrap/Carousel";

import React, { Component } from "react";
import img1 from "../../assets/img/Momento3.jpeg";
import img2 from "../../assets/img/Momento1.jpeg";
import img3 from "../../assets/img/Momento2.jpeg";
import img4 from "../../assets/img/Momento4.jpeg";
import img5 from "../../assets/img/Momento5.jpeg";
import img6 from "../../assets/img/Momento6.jpeg";
import { Jumbotron as Jumbo } from "react-bootstrap";
import styled from "styled-components";
import { getMomentoById } from "./../../api/momentosService";
import { Link } from "react-router-dom";

const Styles = styled.div`
  .jumbo {
    background-color: rgba(200, 240, 255, 0.2);
    height: 30px;
    padding: 0px;
    text-align: center;
    background-size: cover;
  }
  .jumbo3 {
    background-color: rgba(200, 240, 255, 0.3);
    height: 15px;
    padding: 1px;
    text-align: center;
    background-size: cover;
  }
  .card {
    background-color: rgba(217, 240, 255, 0.1);
    box-shadow: 0px 0px 15px -5px;
    height: 450px;
  }

  .card:hover {
  }
  .h-divider {
    margin-top: 5px;
    margin-bottom: 5px;
    height: 1px;
    width: 100%;
    border-top: 2px solid rgba(0, 0, 0, 0.6);
  }

  .card-body {
    height: 150px;
  }

  .jumbo2 {
    background-color: rgb(255, 151, 26, 0.4);
    height: 30px;
    padding: 0px;
    text-align: center;
    background-size: cover;
  }
  .carousel {
    background-color: rgba(255, 248, 249, 0.1);
  }
  .container {
    justify-content: center;
  }
  .link {
    color: #000117;
  }
`;

//import img1 from "../assets/luna.jpg";
//import img2 from "../assets/Lamona.jpg"
//import {Button} from 'react-bootstrap';
export default class Home extends Component {
  state = {
    momentos: [],
  };

  async componentDidMount() {
    const { data: momentos } = await getMomentoById(27);
    this.setState({ momentos });
  }
  render() {
    return (
      <div>
        <Styles>
          {/*  <h2 style={{ marginLeft: "40%" }}>Bienvenido</h2>
    <div style={{ width: "50%", marginLeft: "25%" }}>
      <p>
        En esta plataforma podras conseguir productos increibles y variados.
        Conoce los Momentos que te permitiran conseguir productos a un increible
        precio. Para poder adquirir productos tienes la opcion de suscribirte a
        un momento. Una vez suscripto ya estaras dentro de el cupo de personas
        que recibiran productos relacionados a tu momento selecionado.
      </p>
    </div>
*/}
          <Jumbo className="jumbo3"></Jumbo>
          <div className="container" style={{ marginBottom: "2rem" }}>
            <Carousel variant="black" style={{ marginBottom: "2rem" }}>
              <Carousel.Item>
                <img
                  style={{ height: "500px" }}
                  className="d-block mx-auto  slider-image img-responsive "
                  src={img3}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  style={{ height: "500px" }}
                  className="d-block mx-auto slider-image img-responsive"
                  src={img2}
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>

            <div>
              {/*  <h2 style={{ marginLeft: "40%" }}>Bienvenido</h2>
    <div style={{ width: "50%", marginLeft: "25%" }}>
      <p>
        En esta plataforma podras conseguir productos increibles y variados.
        Conoce los Momentos que te permitiran conseguir productos a un increible
        precio. Para poder adquirir productos tienes la opcion de suscribirte a
        un momento. Una vez suscripto ya estaras dentro de el cupo de personas
        que recibiran productos relacionados a tu momento selecionado.
      </p>
    </div>
*/}

              <div className="container ">
                <div className="h-divider" style={{ marginBottom: "2rem" }}>
                  {" "}
                </div>

                <Jumbo className="jumbo">
                  <h1>Destacados!</h1>
                  <p>Los momentos mas prendidos fuego.</p>
                </Jumbo>
              </div>

              <div className="dark-overlay">
                <div className="container">
                  <Carousel style={{ marginBottom: "2rem" }}>
                    <Carousel.Item>
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-4">
                            <div
                              className="card "
                              style={{ alignItems: "center" }}
                            >
                              <Link
                                style={{ textDecoration: "none" }}
                                className="link"
                                to="/momentos"
                              >
                                <img
                                  style={{
                                    height: "250px",
                                    objectFit: "cover",
                                  }}
                                  className="card-img-top"
                                  src={img2}
                                  alt="Card  cap"
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {" "}
                                    Almuerzo de Domingo
                                  </h5>
                                  <p className="card-text">
                                    {" "}
                                    Pasá un domingo en familia.
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>

                          <div className="col-sm-4">
                            <div
                              className="card "
                              style={{ alignItems: "center" }}
                            >
                              <Link
                                style={{ textDecoration: "none" }}
                                className="link"
                                to="/momentos"
                              >
                                <img
                                  style={{
                                    height: "250px",
                                    objectFit: "cover",
                                  }}
                                  className="card-img-top"
                                  src={img3}
                                  alt="Card  cap"
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {" "}
                                    Vacaciones en Europa
                                  </h5>
                                  <p className="card-text">
                                    {" "}
                                    Te hará sentir en Europa.
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div
                              className="card "
                              style={{ alignItems: "center" }}
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                  width: "100%",
                                }}
                                className="link"
                                to="/momentos"
                              >
                                <img
                                  style={{
                                    height: "250px",
                                    objectFit: "cover",
                                  }}
                                  className="card-img-top"
                                  src={img1}
                                  alt="Card  cap"
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {" "}
                                    Noche de Viernes
                                  </h5>
                                  <p className="card-text">
                                    {" "}
                                    Sali a divertite con amigos.{" "}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-4">
                            <div
                              className="card "
                              style={{ alignItems: "center" }}
                            >
                              <Link
                                style={{ textDecoration: "none" }}
                                className="link"
                                to="/momentos"
                              >
                                <img
                                  style={{
                                    height: "250px",
                                    objectFit: "cover",
                                  }}
                                  className="card-img-top"
                                  src={img4}
                                  alt="Card  cap"
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    Salida de amigas
                                  </h5>
                                  <p className="card-text">
                                    {" "}
                                    Divertite con tus amigas.
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div
                              className="card "
                              style={{ alignItems: "center" }}
                            >
                              {" "}
                              <Link
                                style={{
                                  textDecoration: "none",
                                  width: "100%",
                                }}
                                className="link"
                                to="/momentos"
                              >
                                <img
                                  style={{
                                    height: "250px",
                                    objectFit: "cover",
                                  }}
                                  className="card-img-top"
                                  src={img5}
                                  alt="Card  cap"
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {" "}
                                    Netflix & Camping{" "}
                                  </h5>
                                  <p className="card-text">
                                    {" "}
                                    Disfrutá de una peli afuera.
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div
                              className="card "
                              style={{ alignItems: "center" }}
                            >
                              <Link
                                style={{ textDecoration: "none" }}
                                className="link"
                                to="/momentos"
                              >
                                <img
                                  style={{
                                    height: "250px",
                                    objectFit: "cover",
                                  }}
                                  className="card-img-top"
                                  src={img6}
                                  alt="Card  cap"
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {" "}
                                    Velada Romántica
                                  </h5>
                                  <p className="card-text">
                                    {" "}
                                    Disfruta de una noche en pareja
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Carousel.Item>
                  </Carousel>
                  <div className="h-divider" style={{ marginBottom: "2rem" }}>
                    {" "}
                  </div>
                </div>
              </div>
              <div className="container ">
                {/*}  <h1 style={{ textAlign: "center" }}>Ofertas</h1>
            <Jumbo className="jumbo2" style={{}}></Jumbo>*/}
                <Jumbo className="jumbo">
                  <h1>Ofertas!</h1>
                  <p>Aprovecha de estos momentos en descuento.</p>
                </Jumbo>
                <br />
              </div>

              <div className="container">
                <Carousel style={{ marginBottom: "2rem" }}>
                  <Carousel.Item>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4">
                          <div
                            className="card "
                            style={{ alignItems: "center" }}
                          >
                            <Link
                              style={{ textDecoration: "none", width: "100%" }}
                              className="link"
                              to="/momentos"
                            >
                              <img
                                style={{
                                  height: "250px",
                                  objectFit: "cover",
                                }}
                                className="card-img-top"
                                src={img3}
                                alt="Card  cap"
                              />
                              <div className="card-body">
                                <h5 className="card-title">
                                  {" "}
                                  Vacaciones en Europa{" "}
                                </h5>
                                <h1 className="list-group"> 50% Offer</h1>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div
                            className="card "
                            style={{ alignItems: "center" }}
                          >
                            <Link
                              style={{ textDecoration: "none"}}
                              className="link"
                              to="/momentos"
                            >
                              <img
                                style={{
                                  height: "250px",
                                  objectFit: "cover",
                                }}
                                className="card-img-top"
                                src={img2}
                                alt="Card  cap"
                              />
                              <div className="card-body">
                                <h5 className="card-title">
                                  {" "}
                                  Almuerzo de Domingo
                                </h5>
                                <h1 className="list-group"> 50% Offer</h1>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div
                            className="card "
                            style={{ alignItems: "center", overflow: "hidden" }}
                          >
                            <Link
                              style={{ textDecoration: "none", width: "100%" }}
                              className="link"
                              to="/momentos"
                            >
                              <img
                                style={{
                                  height: "250px",
                                  objectFit: "cover",
                                  width: "100%",
                                }}
                                className="card-img-top"
                                src={img1}
                                alt="Card  cap"
                              />
                              <div className="card-body">
                                <h5 className="card-title">Noche de Viernes</h5>
                                <h1 className="list-group"> 50% Offer</h1>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                </Carousel>
                <div className="h-divider" style={{ marginTop: "2rem" }}>
                  {" "}
                </div>
              </div>
            </div>
          </div>
        </Styles>
      </div>
    );
  }
}
