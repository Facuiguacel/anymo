import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Modal, Button } from "react-bootstrap";
import { Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import MisProductosList from "../../componentes/vendedor/misProductosList";
import SearchBox from "../../componentes/comunes/searchBox";
import Pagination from "../../componentes/comunes/pagination";
import { paginate } from "../../utils/paginate";
import {
  deleteProducto,
  getProductosByVendedor,
  habilitarProducto,
} from "../../api/productosService";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../api/authService";

class MisProductos extends Component {
  state = {
    productos: [],
    pageSize: 15,
    currentPage: 1,
    sortColumn: { path: "fecha_registro", order: "desc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const vendedor_id = getCurrentUser()._id;

    await getProductosByVendedor(vendedor_id)
      .then((res) => {
        this.setState({ productos: [...res.data] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearchChange = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
    });
  };

  modalEliminarProducto = (producto) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Modal.Dialog size="lg">
            <Modal.Header>
              <Modal.Title className="text-center">
                <h1>¿Estas seguro?</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4 className="text-center">Vas a eliminar este producto</h4>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button onClick={onClose} variant="outline-dark">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  this.handleEliminarProducto(producto);
                  onClose();
                }}
                variant="outline-danger"
              >
                Si, eliminar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        );
      },
    });
  };

  handleEliminarProducto = async (producto) => {
    const ogProductos = this.state.productos;
    const productos = ogProductos.filter((p) => p._id !== producto._id);
    this.setState({ productos });

    try {
      await deleteProducto(producto._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Error: el producto ya fue eliminado.");
      }
    }
  };

  handleModificarProducto = (producto) => {
    //reenviar a pagina de modificacion de producto
  };

  handleHabilitarProducto = async (producto, productoState) => {
    await habilitarProducto(producto, productoState);
    producto.habilitado = productoState ? 1 : 0;
  };

  getPageData = () => {
    const allProductos = [...this.state.productos];

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const filtered = searchQuery
      ? allProductos.filter(
          (producto) =>
            producto.nombre
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (producto.fecha_registro
              ? producto.fecha_registro
                  .toString()
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              : null)
        )
      : allProductos;

    const sorted = _.orderBy(
      filtered,
      [
        sortColumn.path === "fecha_registro"
          ? function (producto) {
              return producto.fecha_registro === null;
            }
          : filtered,
        sortColumn.path,
      ],
      ["asc", sortColumn.order]
    );

    var productos = paginate(sorted, currentPage, pageSize);

    return { totalCount: sorted.length, productos };
  };

  render() {
    if (true) {
      const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

      const { totalCount, productos } = this.getPageData();

      return (
        <div className="w-100 pb-5">
          <Container fluid>
            <h1 className="py-3 mb-0 mt-2 text-center">Listado de Productos</h1>
            <div className="d-flex justify-content-center my-3">
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearchChange}
                placeholder="Buscar producto..."
              />
              <Link to="/vendedor/producto/nuevo">
                <button className="btn btn-primary">Ingresar Producto</button>
              </Link>
            </div>
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
            <MisProductosList
              productos={productos}
              sortColumn={sortColumn}
              onEliminar={this.modalEliminarProducto}
              onModificar={this.handleModificarProducto}
              onSort={this.handleSort}
              onHabilitar={this.handleHabilitarProducto}
              handleChangePerimetral={this.handleChangePerimetral}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </Container>
        </div>
      );
    } else {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <Spinner animation="border" size="x2" />
        </div>
      );
    }
  }
}

export default MisProductos;
