/* eslint-disable no-unused-vars */
import http from "./httpService";

const url = "http://localhost:3001/momentos";

function momentosUrl(id) {
  return `${url}/${id ? id : ""}`;
}

export function getMomentos() {
  return http.get(url);
}

export function getMomentoById(id) {
  return http.get(momentosUrl(id));
}
export function getFotosMomentoById(id) {
  return http.get(momentosUrl(id) + "/fotos");
}

export async function cargarMomento(momento) {
  if (momento._id) {
    const body = { ...momento };
    delete body._id;
    http.put(momentosUrl(momento._id), body);
    return momento._id;
  }
  const { data } = await http.post(url, momento);
  return data[0]._id;
}
export function cargarFotoMomento(momento_id, foto) {
  return http.post(momentosUrl(momento_id) + "/fotos", foto);
}

export function habilitarMomento(momento, habilitacion) {
  const body = { habilitado: habilitacion };
  return http.put(`${momentosUrl(momento._id)}/habilitar`, body);
}

export function deleteMomento(id) {
  return http.delete(momentosUrl(id));
}
