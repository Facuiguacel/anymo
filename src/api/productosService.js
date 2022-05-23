/* eslint-disable no-unused-vars */
import { getCurrentUser } from "./authService";
import http from "./httpService";

const url = "http://localhost:3001/productos";

function productoUrl(id) {
  return `${url}/${id ? id : ""}`;
}

export function getProductos() {
  return http.get(`${url}/todos`);
}
export function getProductosByVendedor(idVendedor) {
  return http.get(`${url}/todos/${idVendedor}`);
}

export function getProductoById(id) {
  return http.get(productoUrl(id));
}

export function getFotosProductoById(id) {
  return http.get(productoUrl(id) + "/fotos");
}

export async function cargarProducto(producto) {
  if (producto._id) {
    const body = { ...producto };
    delete body._id;
    http.put(productoUrl(producto._id), body);
    return producto._id;
  }
  const idVendedor = getCurrentUser()._id;
  const { data } = await http.post(`${url}/todos/${idVendedor}`, producto);
  return data[0]._id;
}

export function cargarFotoProducto(idProducto, foto) {
  return http.post(productoUrl(idProducto) + "/fotos", foto);
}

export function habilitarProducto(producto, habilitacion) {
  const body = { habilitado: habilitacion };
  return http.put(`${productoUrl(producto._id)}/habilitar`, body);
}

export function deleteProducto(id) {
  return http.delete(productoUrl(id));
}
