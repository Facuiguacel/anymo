import React, { Component } from "react";
import { Button, Container, Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "../../componentes/comunes/searchBox";
import Pagination from "../../componentes/comunes/pagination";
import { paginate } from "../../utils/paginate";

import VendedoresList from "../../componentes/administrador/vendedoresList";
import { deleteVendedor, getVendedores } from "../../api/usuariosService";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

class VendedoresAdmin extends Component {
  state = {
    vendedores: [],
    pageSize: 15,
    currentPage: 1,
    sortColumn: { path: "fecha_registro", order: "desc" },
    searchQuery: "",
  };

  async componentDidMount() {
    await getVendedores()
      .then((res) => {
        this.setState({ vendedores: [...res.data] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  modalEliminarVendedor = (vendedor) => {
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
              <h4 className="text-center">Vas a eliminar este vendedor</h4>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button onClick={onClose} variant="outline-dark">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  this.handleEliminarVendedor(vendedor);
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

  handleEliminarVendedor = async (vendedor) => {
    const ogVendedores = this.state.vendedores;
    const vendedores = ogVendedores.filter((v) => v._id !== vendedor._id);
    this.setState({ vendedores });

    try {
      await deleteVendedor(vendedor._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Error: el vendedor ya fue eliminado.");
      }
    }
  };

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

  getPageData = () => {
    const allvendedores = [...this.state.vendedores];

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const filtered = searchQuery
      ? allvendedores.filter(
          (vendedor) =>
            vendedor.nombre
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            vendedor.email
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            vendedor.telefono
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (vendedor.fecha_registro
              ? vendedor.fecha_registro
                  .toString()
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              : null)
        )
      : allvendedores;

    const sorted = _.orderBy(
      filtered,
      [
        sortColumn.path === "telefono"
          ? function (vendedor) {
              return vendedor.telefono === null;
            }
          : sortColumn.path === "fecha_registro"
          ? function (vendedor) {
              return vendedor.fecha_registro === null;
            }
          : filtered,
        sortColumn.path,
      ],
      ["asc", sortColumn.order]
    );

    var vendedores = paginate(sorted, currentPage, pageSize);

    return { totalCount: sorted.length, vendedores };
  };

  render() {
    if (true) {
      const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

      const { totalCount, vendedores } = this.getPageData();
      return (
        <div>
          <div className="w-100 pb-5">
            <Container fluid>
              <h1 className="py-3 mb-0 mt-2 text-center">
                Listado de vendedores
              </h1>
              <div className="d-flex justify-content-center my-3">
                <SearchBox
                  value={searchQuery}
                  onChange={this.handleSearchChange}
                  placeholder="Buscar vendedor..."
                />
                <Link to="/admin/vendedor/nuevo">
                  <button className="btn btn-primary">Ingresar vendedor</button>
                </Link>
              </div>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
              <VendedoresList
                vendedores={vendedores}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                onEliminar={this.modalEliminarVendedor}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </Container>
          </div>
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

export default VendedoresAdmin;
