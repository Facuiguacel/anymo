/* eslint-disable no-unused-vars */
import http from "./httpService";

const url = "http://localhost:3001/suscripciones";

function suscripcionUrl(id) {
  return `${url}/${id ? id : ""}`;
}

export function guardarSuscripcion(idComprador, idMomento) {
  return http.post(suscripcionUrl(), {
    comprador_id: idComprador,
    momento_id: idMomento,
  });
}

export function getSuscripcionesOfComprador(idComprador) {
  return http.get(`${url}/comprador/${idComprador}`);
}

export function deleteSuscripcion(id) {
  return http.delete(suscripcionUrl(id));
}
