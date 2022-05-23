/* eslint-disable no-unused-vars */
import http from "./httpService";

const url = "http://localhost:3001/usuarios";

function compradorUrl(id) {
  return `${url}/comprador/${id ? id : ""}`;
}
function vendedorUrl(id) {
  return `${url}/vendedor/${id ? id : ""}`;
}
function adminUrl(id) {
  return `${url}/admin/${id ? id : ""}`;
}

export function getCompradores() {
  return http.get(compradorUrl());
}
export function getVendedores() {
  return http.get(vendedorUrl());
}
export function getAdmins() {
  return http.get(adminUrl());
}

export function getCompradorById(id) {
  return http.get(compradorUrl(id));
}
export function getVendedorById(id) {
  return http.get(vendedorUrl(id));
}
export function getAdminById(id) {
  return http.get(adminUrl(id));
}

export function guardarComprador(usuario) {
  console.log(usuario);
  if (usuario._id) {
    const body = { ...usuario };
    delete body._id;
    return http.put(compradorUrl(usuario._id), body);
  }
  return http.post(compradorUrl(), usuario);
}
export function guardarVendedor(usuario) {
  if (usuario._id) {
    const body = { ...usuario };
    delete body._id;
    return http.put(vendedorUrl(usuario._id), body);
  }
  usuario.password = "1234"; //agregarle contraseña aleatoria
  return http.post(vendedorUrl(), usuario);
}
export function guardarAdmin(usuario) {
  if (usuario._id) {
    const body = { ...usuario };
    delete body._id;
    return http.put(adminUrl(usuario._id), body);
  }

  return http.post(adminUrl(), usuario);
}

export function deleteComprador(id) {
  return http.delete(compradorUrl(id));
}
export function deleteVendedor(id) {
  return http.delete(vendedorUrl(id));
}
export function deleteAdmin(id) {
  return http.delete(adminUrl(id));
}
