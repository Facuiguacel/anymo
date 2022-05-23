import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { provincias } from "../../assets/datos/provincias.json";
import { getCompradorById } from "../../api/usuariosService";
import auth from "../../api/authService";
import styled from "styled-components";
import Joi from "joi-browser";

const Styles = styled.div`
  .card-base {
    background-color: #e4e4e4;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 8px -5px;
    max-width: 100%;
  }
  .err {
    font-size: small;
    color: crimson;
  }
  .card-direccion {
    max-height: 400px;
  }
  .card-body {
    padding: 20px;
    height: 100%;
  }
  .card-text,
  .card-body {
    white-space: pre-wrap;
  }
  .form-outline,
  .form-outline-top,
  .form-outline-bot,
  .form-outline-bot-mid {
    margin: 10px 0;
  }
  .form-label {
    margin-left: 5px;
  }

  @media only screen and (max-width: 460px) {
    .card-body {
      padding: 10px;
    }
    .card-text {
      font-size: small;
    }
    .form-outline-top {
      margin-top: 0;
    }
    .form-outline-bot {
      margin-bottom: 0;
    }
    .form-outline-bot-mid {
      margin-bottom: 0;
      padding: 0;
    }
    .form-label {
      font-size: smaller;
    }
  }
`;

const DirEnvioForm = ({ datosDir, setDatosDir, setDatosDirValidos }) => {
  const [ciudades, setCiudades] = useState([]);
  const [errors, setErrors] = useState({});

  const schema = {
    dir_provincia: Joi.any(),
    dir_ciudad: Joi.any(),
    dir_calle: Joi.string()
      .label("Calle")
      .required()
      .options({
        language: {
          any: {
            required: "requerida",
            empty: "requerida",
          },
          string: {
            base: "requerida",
          },
        },
      }),
    dir_altura: Joi.number()
      .integer()
      .positive()
      .max(9999)
      .label("Altura")
      .required()
      .options({
        language: {
          any: {
            required: "requerida",
            empty: "requerida",
          },
          number: {
            base: "debe ser un número",
            integer: "no válida",
            max: "no válida",
            positive: "no válida",
          },
        },
      }),
    dir_pisodpto: Joi.string().label("Piso/Dpto").allow(null, ""),
    dir_codpostal: Joi.number()
      .integer()
      .positive()
      .min(1000)
      .max(9999)
      .label("Código Postal")
      .required()
      .options({
        language: {
          any: {
            required: "requerido",
            empty: "requerido",
          },
          number: {
            base: "debe ser un número",
            integer: "no válido",
            min: "no válido",
            max: "no válido",
            positive: "no válido",
          },
        },
      }),
  };

  useEffect(() => {
    try {
      getCompradorById(auth.getCurrentUser()._id).then(({ data }) => {
        const comprador = data[0];
        if (!comprador.dir_provincia) {
          comprador.dir_provincia = "Buenos Aires";
        }
        const {
          dir_ciudad,
          dir_provincia,
          dir_calle,
          dir_altura,
          dir_pisodpto,
          dir_codpostal,
        } = comprador;
        const datos = {
          dir_ciudad,
          dir_provincia,
          dir_calle,
          dir_altura,
          dir_pisodpto,
          dir_codpostal,
        };
        const errs = validate(datos);
        if (!errs) setDatosDirValidos(true);
        else setDatosDirValidos(false);
        setErrors(errs || {});
        getCiudadesByProvincia(dir_provincia).then((res) => {
          setCiudades(res);
          if (!dir_ciudad)
            setDatosDir(() => ({
              ...comprador,
              dir_ciudad: res[0] ? res[0].nombre : "",
            }));
          else setDatosDir(comprador);
        });
      });
    } catch (error) {
      toast.error(
        "Error al cargar los datos de dirección. Intente nuevamente mas tarde."
      );
    }
  }, []);

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const propSchema = Joi.object({ [name]: schema[name] });
    const { error } = propSchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  const validate = (obj) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(obj, schema, options);
    if (!error) return null;

    const errs = {};
    for (let item of error.details) {
      errs[item.path[0]] = item.message;
    }

    return errs;
  };

  const getCiudadesByProvincia = async (provincia) => {
    try {
      const { data } = await axios.get(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&orden=nombre&max=499`
      );
      const ciudadess = [...data.municipios];
      return ciudadess;
    } catch (error) {
      toast.error("Error de nuestra parte. Por favor, intente más tarde.");
      return [];
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    const errs = { ...errors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) errs[name] = errorMessage;
    else delete errs[name];
    setErrors(errs);

    if (!Object.keys(errs).length) setDatosDirValidos(true);
    else setDatosDirValidos(false);

    if (name === "dir_provincia" && value !== datosDir.dir_provincia) {
      getCiudadesByProvincia(value).then((res) => {
        setCiudades(res);
        setDatosDir((prev) => ({
          ...prev,
          dir_ciudad: res[0] ? res[0].nombre : value,
        }));
      });
    }
    setDatosDir((prev) => ({ ...prev, [name]: value }));
  };

  if (datosDir && ciudades) {
    return (
      <Styles>
        <div className="card-base card-direccion">
          <div className="card-body">
            <div className="row">
              <div className="form-outline-top col-sm-6 col-12">
                <label className="form-label" htmlFor="dir_provincia">
                  Provincia
                </label>
                <select
                  onChange={handleChange}
                  value={datosDir.dir_provincia}
                  defaultValue={provincias[0]}
                  placeholder="Provincia"
                  type="text"
                  id="dir_provincia"
                  name="dir_provincia"
                  className="form-control input-custom"
                >
                  {provincias.map((provincia) => (
                    <option key={provincia.id} value={provincia.nombre}>
                      {provincia.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-outline col-sm-6 col-12">
                <label className="form-label" htmlFor="dir_ciudad">
                  Ciudad
                </label>
                <select
                  onChange={handleChange}
                  value={datosDir.dir_ciudad || ""}
                  disabled={!datosDir.dir_provincia}
                  placeholder="Ciudad"
                  id="dir_ciudad"
                  name="dir_ciudad"
                  className="form-control input-custom"
                >
                  {ciudades.map((ciudad) => (
                    <option key={ciudad.id} value={ciudad.nombre}>
                      {ciudad.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-outline col">
                <label className="form-label" htmlFor="dir_calle">
                  Calle
                </label>
                {errors.dir_calle && <p className="err">{errors.dir_calle}</p>}

                <input
                  onChange={handleChange}
                  value={datosDir.dir_calle || ""}
                  placeholder="Calle"
                  type="text"
                  id="dir_calle"
                  name="dir_calle"
                  className="form-control input-custom"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-outline-bot col-4">
                <label className="form-label" htmlFor="dir_altura">
                  Altura
                </label>
                {errors.dir_altura && (
                  <p className="err">{errors.dir_altura}</p>
                )}

                <input
                  onChange={handleChange}
                  value={datosDir.dir_altura || ""}
                  placeholder="Altura"
                  type="text"
                  id="dir_altura"
                  name="dir_altura"
                  className="form-control input-custom"
                />
              </div>
              <div className="form-outline-bot-mid col-4">
                <label className="form-label" htmlFor="dir_codpostal">
                  Piso / Dpto
                </label>
                {errors.dir_pisodpto && (
                  <p className="err">{errors.pisodpto}</p>
                )}
                <input
                  onChange={handleChange}
                  value={datosDir.dir_pisodpto || ""}
                  placeholder="(Opcional)"
                  type="text"
                  id="dir_pisodpto"
                  name="dir_pisodpto"
                  className="form-control input-custom"
                />
              </div>
              <div className="form-outline-bot col-4">
                <label className="form-label" htmlFor="dir_codpostal">
                  Cód. Postal
                </label>
                {errors.dir_codpostal && (
                  <p className="err">{errors.dir_codpostal}</p>
                )}
                <input
                  onChange={handleChange}
                  value={datosDir.dir_codpostal || ""}
                  placeholder="Código Postal"
                  type="text"
                  id="dir_codpostal"
                  name="dir_codpostal"
                  className="form-control input-custom"
                />
              </div>
            </div>
          </div>
        </div>
      </Styles>
    );
  } else {
    return <h3>Datos de usuario no cargados</h3>;
  }
};

export default DirEnvioForm;
