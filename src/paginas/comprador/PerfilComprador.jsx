import React, { Component } from "react";

import styled from "styled-components";
import auth from "../../api/authService";
import { getCompradorById } from "./../../api/usuariosService";

const Styles = styled.div`
  .row {
    justify-content: space-around;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 5px;
  }
`;
export default class PerfilComprador extends Component {
  state = {
    comprador: {},
  };

  async componentDidMount() {
    const idComprador = auth.getCurrentUser()._id;
    await getCompradorById(idComprador)
      .then((res) => this.setState({ comprador: res.data[0] }))
      .catch((ex) => console.log(ex));
  }
  render() {
    const { comprador } = this.state;
    if (!comprador || Object.keys(comprador).length < 1) return <div>No pudimos conseguir tus datos del perfil</div>;
    return (
      <div className="container col-xl-8 col-sm-10 col-xs-12 my-4">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
          crossOrigin="anonymous"
        ></link>

        <Styles>
          <div className="container">
            <div className=" row d-flex justify-content-center">
              <div className="col-md-10 mt-4">
                <div className="row z-depth-3">
                  <div className="col-sm-4 bg-info">
                    <div className="card-block text-center text-white">
                      <i className="fas fa-user-tie fa-7x mt-5"> </i>
                      <h2 className="font-weight-bold mt-4">{comprador.nombre}</h2>
                    </div>
                  </div>
                  <div className="col-sm-8 bg-white">
                    <h4 className="mt-3"> Datos personales </h4>

                    <hr className="bg-info" />
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="font-weight-bold "> Nombre</p>
                        <h6 className="text-muted"> {comprador.nombre} </h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-weight-bold "> Apellido </p>
                        <h6 className="text-muted"> {comprador.apellido}</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-xs-12">
                        <p className="font-weight-bold "> Email </p>
                        <h6 className="text-muted"> {comprador.email} </h6>
                      </div>
                      <div className=" col-sm-6 col-xs-12">
                        <p className="font-weight-bold "> Telefono</p>
                        <h6 className="text-muted">{comprador.telefono || "-"}</h6>
                      </div>
                    </div>

                    <h4 className="mt-3"> Datos Domicilio </h4>

                    <hr className="bg-info" />
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="font-weight-bold "> Calle </p>
                        <h6 className="text-muted"> {comprador.dir_calle}</h6>

                        <p className="font-weight-bold "> Codigo Postal </p>
                        <h6 className="text-muted">{comprador.dir_codpostal}</h6>
                        <p className="font-weight-bold "> Piso de Dpto</p>
                        <h6 className="text-muted">{comprador.dir_pisodpto || "-"}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-weight-bold "> Altura </p>
                        <h6 className="text-muted"> {comprador.dir_altura} </h6>

                        <p className="font-weight-bold "> Ciudad </p>
                        <h6 className="text-muted"> {comprador.dir_ciudad}</h6>

                        <p className="font-weight-bold "> Provincia </p>
                        <h6 className="text-muted">{comprador.dir_provincia}</h6>
                      </div>
                    </div>
                    <hr className="bg-info" />
                    <ul className="list-unstyled d-flex justify-content-center mt-4"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Styles>
      </div>
    );
  }
}
