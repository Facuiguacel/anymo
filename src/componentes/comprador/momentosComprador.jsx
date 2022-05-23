import React, { Component } from "react";
import { Button } from "react-bootstrap";

import styled from "styled-components";

import { Link } from "react-router-dom";
import { getMomentos } from "./../../api/momentosService";

const Styles = styled.div`
  .containercard:hover {
    border-radius: 10px;
    transform: scale(1.05);
    box-shadow: 0px 0px 30px -5px;
    background-color: rgba(200, 240, 255, 0.2);
    transition: 0.3s;
    animation: ease-in-out;
  }

  .card {
    background-color: rgba(200, 240, 255, 0.1);
    border-radius: 10px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 0px 15px -5px;
    align-items: center;
    height: 400px;
  }

  .card:before {
    position: absolute;
    content: "";
    width: 80%;
    height: 220%;
    background: rgba(255, 0, 0, 0.5);
    top: -50%;
    left: -50%;
    z-index: 1;
    transform: rotate(45deg);
    transform-origin: center top 0;
    transition: 0.2s;
  }
  .card:hover:before {
    left: 5%;
  }
  .card-top-img {
    object-fit: cover;
    width: 100%;
    height: 60%;
  }
  .link {
    color: #000117;
  }
  .link-text {
    color: #fff;
  }
  .card-text {
    white-space: pre-wrap;
  }
  .card-price {
    text-align: left;
    width: 100%;
    padding: 0 20px;
    position: absolute;
    top: -100%;
    color: #fff;
    left: 0;
    z-index: 2;
    transition: 0.25s;
  }
  .card-price h1 {
    font-family: Roboto;
    font-weight: 400;
  }
  .card-price .card-price-unit {
    line-height: 28px;
    font-size: 1rem;
    font-weight: 300;
    vertical-align: text-top;
  }
  .card:hover .card-price {
    transform: scale(1.1);
    margin: 0;
    top: 5%;
    left: 5%;
  }

  .card-container {
    width: 300px;
    overflow: hidden;
    box-shadow: 0px 0px 30px -5px;
  }
  .card-container:hover {
    transform: scale (1.1);
    box-shadow: 0px 0px 30px 0px;
  }
  .row {
    justify-content: space-evenly;
  }
`;
export default class ObtenerMomentos extends Component {
  state = {
    momentos: [],
  };

  async componentDidMount() {
    const { data: momentos } = await getMomentos();
    this.setState({ momentos });
  }
  render() {
    return (
      <div>
        <Styles>
          <div className="container">
            <div className="row">
              {this.state.momentos.map((momento) => (
                <div
                  className="col-lg-4 col-sm-6 col-10"
                  key={momento._id}
                  style={{ marginBottom: "2rem" }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    className="link"
                    to={`/momentos/${momento._id}`}
                  >
                    <div className="containercard">
                      <div className="card">
                        <img
                          className="card-top-img"
                          src={
                            momento.foto_dir
                              ? `http://localhost:3001/${momento.foto_dir}`
                              : null
                          }
                          alt={momento.nombre}
                        />

                        <div className="card-body w-100">
                          <h1 className="card-title"> {momento.nombre} </h1>
                          <p className="card-text">{momento.frase}</p>
                          <h1 className="card-price">
                            <span className="card-price-unit">$</span>
                            {momento.precio}
                          </h1>
                          <Button
                            as={Link}
                            to={`/momentos/suscribirse/${momento._id}`}
                            variant="danger"
                          >
                            Suscribirse
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Styles>
      </div>
    );
  }
}
