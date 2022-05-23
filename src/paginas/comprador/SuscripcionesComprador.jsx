import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import auth from "../../api/authService";
import { getSuscripcionesOfComprador } from "../../api/suscripcionesService";

const SuscripcionesComprador = () => {
  const [momentos, setmomentos] = useState([]);
  const [loading, setloading] = useState(true);

  const Styles = styled.div`
    .card-base {
      background-color: #e4e4e4;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 0px 8px -5px;
      max-width: 100%;
      margin-botton: 25px;
    }
    Button {
      border-radius: 10px;
    }
    .card-momento {
      height: 120px;
      margin-bottom: 20px;
    }
    .card-img-right {
      object-fit: cover;
      width: 100%;
      height: 120px;
      border-radius: 0;
    }
    .card-body {
      padding: 20px;
      height: 100%;
    }
    .card-text,
    .card-body {
      white-space: pre-wrap;
    }
    .form-label {
      margin-left: 5px;
      white-space: nowrap;
    }
    .titulo {
      font-size: 32px;
      margin-bottom: 25px;
      margin-top: 25px;
    }

    @media only screen and (max-width: 460px) {
      .card-body {
        padding: 10px;
      }
      .card-text {
        font-size: smaller;
      }
    }
  `;

  useEffect(() => {
    setloading(true);
    getSuscripcionesOfComprador(auth.getCurrentUser()._id)
      .then((res) => setmomentos(res.data))
      .catch((ex) =>
        toast.error("Error al cargar sus datos. Por favor, intente mas tarde")
      );
    setloading(false);
  }, []);

  return (
    <Styles>
      <div className="container col-xl-6 col-lg-8 col-md-10 col-xs-12 my-4">
        {loading && <h1>Cargando tus momentos...</h1>}
        {momentos.length > 0 && (
          <div>
            <h1 className="titulo">Tus Momentos</h1>
            {momentos.map((momento) => (
              <div key={momento.momento_id} className="card-base card-momento">
                <div className="row no-gutters">
                  <div className="col-8">
                    <div className="card-body ">
                      <h5 className="card-title px-2">{momento.nombre}</h5>
                      <p className="card-text px-2">{momento.frase}</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <img
                      className="card-img-right"
                      src={`http://localhost:3001/${momento.foto_dir}`}
                      alt={momento.nombre}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {momentos.length === 0 && (
          <div>
            <h1>Parece que todavía no estás suscripto a ningún momento.</h1>
          </div>
        )}
      </div>
    </Styles>
  );
};

export default SuscripcionesComprador;
