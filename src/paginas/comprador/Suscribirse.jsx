import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getFotosMomentoById, getMomentoById } from "../../api/momentosService";
import styled from "styled-components";
import { toast } from "react-toastify";
import CreditCardForm from "../../componentes/comunes/creditCardForm";
import DirEnvioForm from "../../componentes/comprador/dirEnvioForm";
import { Button } from "react-bootstrap";
import { guardarSuscripcion } from "../../api/suscripcionesService";
import auth from "../../api/authService";
import { guardarComprador } from "../../api/usuariosService";

const Styles = styled.div`
  .card-base {
    background-color: #e4e4e4;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 8px -5px;
    max-width: 100%;
  }
  Button {
    border-radius: 10px;
  }
  .card-momento {
    height: 120px;
  }
  .seccion {
    margin: 10px;
    h1 {
      margin: 20px 10px;
    }
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

  @media only screen and (max-width: 460px) {
    .card-body {
      padding: 10px;
    }
    .card-text {
      font-size: small;
    }
    .form-label {
      font-size: smaller;
    }
    .seccion {
      margin-left: 0;
      margin-right: 0;
      h1 {
        margin-left: 5px;
      }
    }
  }
`;

const Suscribirse = () => {
  const [momento, setMomento] = useState({});
  const [datosDir, setDatosDir] = useState({});
  const [datosPago, setDatosPago] = useState({
    cardName: "",
    cardNumber: "",
    cardExpiration: "",
    cardSecurityCode: "",
    focus: "",
  });
  const [datosPagoValidos, setDatosPagoValidos] = useState(false);
  const [datosDirValidos, setDatosDirValidos] = useState(false);
  const [fotoMomento, setFotoMomento] = useState();
  const { idMomento } = useParams();

  useEffect(() => {
    try {
      getMomentoById(idMomento).then(({ data }) => setMomento(data[0]));
      getFotosMomentoById(idMomento).then(({ data }) =>
        setFotoMomento(data[0])
      );
    } catch (error) {
      toast.error(
        "Error al cargar los datos necesarios. Intente nuevamente más tarde."
      );
    }
  }, [idMomento]);

  const handleSubmit = async () => {
    const idComprador = auth.getCurrentUser()._id;

    try {
      await guardarComprador(datosDir);
      await guardarSuscripcion(idComprador, momento._id);
      toast.success("Suscrito exitosamente!");
    } catch (error) {
      toast.error("Ya está suscripto a este momento.");
    }
  };

  if (momento && fotoMomento) {
    return (
      <div>
        <Styles>
          <div className="container col-xl-6 col-lg-8 col-md-10 col-xs-12 my-4">
            <div className="seccion">
              <h1>Momento al que te vas a suscribir!</h1>
              <div className="card-base card-momento">
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
                      src={`http://localhost:3001/${fotoMomento.dir}`}
                      alt={momento.nombre}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="seccion">
              <h1>Dirección de envio</h1>
              <DirEnvioForm
                datosDir={datosDir}
                setDatosDir={setDatosDir}
                setDatosDirValidos={setDatosDirValidos}
              />
            </div>
            <hr />
            <div className="seccion">
              <h1>Datos de pago</h1>
              <CreditCardForm
                datosPago={datosPago}
                setDatosPago={setDatosPago}
                setDatosPagoValidos={setDatosPagoValidos}
              />
            </div>
            <div className="seccion">
              <Button
                disabled={!datosPagoValidos || !datosDirValidos}
                onClick={handleSubmit}
              >
                Confimar
              </Button>
            </div>
          </div>
        </Styles>
      </div>
    );
  } else {
    return <h1>Cargando</h1>;
  }
};

export default Suscribirse;
