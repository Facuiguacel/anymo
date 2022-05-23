import React, { Component } from "react";
import { Button, Container, Modal, Spinner } from "react-bootstrap";
import _ from "lodash";
import SearchBox from "../../componentes/comunes/searchBox";
import Pagination from "../../componentes/comunes/pagination";
import { paginate } from "../../utils/paginate";

import CompradoresList from "../../componentes/administrador/compradoresList";
import { deleteComprador, getCompradores } from "../../api/usuariosService";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

class CompradoresAdmin extends Component {
  state = {
    compradores: [],
    pageSize: 15,
    currentPage: 1,
    sortColumn: { path: "fecha_registro", order: "desc" },
    searchQuery: "",
  };

  async componentDidMount() {
    await getCompradores()
      .then((res) => {
        this.setState({ compradores: [...res.data] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  modalEliminarComprador = (comprador) => {
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
              <h4 className="text-center">Vas a eliminar este comprador</h4>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button onClick={onClose} variant="outline-dark">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  this.handleEliminarComprador(comprador);
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

  handleEliminarComprador = async (comprador) => {
    const ogCompradores = this.state.compradores;
    const compradores = ogCompradores.filter((c) => c._id !== comprador._id);
    this.setState({ compradores });

    try {
      await deleteComprador(comprador._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Error: el comprador ya fue eliminado.");
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
    const allcompradores = [...this.state.compradores];

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const filtered = searchQuery
      ? allcompradores.filter(
          (comprador) =>
            comprador.nombre
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            comprador.email
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            comprador.apellido
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            comprador.telefono
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (comprador.fecha_registro
              ? comprador.fecha_registro
                  .toString()
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              : null)
        )
      : allcompradores;

    const sorted = _.orderBy(
      filtered,
      [
        sortColumn.path === "telefono"
          ? function (comprador) {
              return comprador.telefono === null;
            }
          : sortColumn.path === "fecha_registro"
          ? function (comprador) {
              return comprador.fecha_registro === null;
            }
          : filtered,
        sortColumn.path,
      ],
      ["asc", sortColumn.order]
    );

    var compradores = paginate(sorted, currentPage, pageSize);

    return { totalCount: sorted.length, compradores };
  };

  render() {
    if (true) {
      const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

      const { totalCount, compradores } = this.getPageData();
      return (
        <div>
          <div className="w-100 pb-5">
            <Container fluid>
              <h1 className="py-3 mb-0 mt-2 text-center">
                Listado de compradores
              </h1>
              <div className="d-flex justify-content-center my-3">
                <SearchBox
                  value={searchQuery}
                  onChange={this.handleSearchChange}
                  placeholder="Buscar comprador..."
                />
              </div>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
              <CompradoresList
                compradores={compradores}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                onEliminar={this.modalEliminarComprador}
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

export default CompradoresAdmin;
