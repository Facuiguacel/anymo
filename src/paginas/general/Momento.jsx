import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getFotosMomentoById, getMomentoById } from "../../api/momentosService";

const Styles = styled.div`
  .fotos-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .foto {
    align-self: center;
    max-height: 250px;
    max-width: 50%;
    padding: 5px;
    border-radius: 12px;
  }
  .descripcion {
    font-weight: 300;
    white-space: pre-wrap;
  }
  @media only screen and (max-width: 577px) {
  }
`;

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const Momento = () => {
  const [momento, setMomento] = useState();
  const [fotosMomento, setFotosMomento] = useState([]);
  const { idMomento } = useParams();

  useEffect(() => {
    try {
      getMomentoById(idMomento).then(({ data }) => setMomento(data[0]));
      getFotosMomentoById(idMomento).then(({ data }) => setFotosMomento(data));
    } catch (error) {
      toast.error(
        "Error inesperado de nuestra parte. Intente nuevamente mas tarde."
      );
    }
  }, [idMomento]);

  if (momento && fotosMomento) {
    return (
      <Styles>
        <div className="container container col-xl-6 col-md-8 col-12 my-4">
          <h1 className="title">{momento.nombre}</h1>
          <hr />
          <h3 className="descripcion">{momento.descripcion || lorem}</h3>
          <div className="fotos-container">
            {fotosMomento.map((foto) => (
              <img
                className="foto"
                key={foto._id}
                src={`http://localhost:3001/${foto.dir}`}
                alt=""
              />
            ))}
          </div>

          <h3>Precio: ${momento.precio}</h3>
          <Link to={`/momentos/suscribirse/${momento._id}`}>
            <Button variant="danger" style={{ maxWidth: "200px" }}>
              Suscribirse
            </Button>
          </Link>
        </div>
      </Styles>
    );
  } else return <h1>No se pudo cargar el momento</h1>;
};

export default Momento;
