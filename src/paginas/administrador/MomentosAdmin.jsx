import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Modal, Button } from "react-bootstrap";
import { Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import MomentosList from "../../componentes/administrador/momentosList";
import SearchBox from "../../componentes/comunes/searchBox";
import Pagination from "../../componentes/comunes/pagination";
import { paginate } from "../../utils/paginate";
import {
  deleteMomento,
  getMomentos,
  habilitarMomento,
} from "../../api/momentosService";
import { toast } from "react-toastify";

class MomentosAdmin extends Component {
  state = {
    momentos: [],
    pageSize: 15,
    currentPage: 1,
    sortColumn: { path: "fecha_registro", order: "desc" },
    searchQuery: "",
  };

  async componentDidMount() {
    try {
      const { data: momentos } = await getMomentos();
      this.setState({ momentos });
    } catch (ex) {
      toast.error(
        "Hubo problemas al intentar conseguir los momentos. Intente de nuevo mas tarde."
      );
    }
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

  modalEliminarMomento = (momento) => {
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
              <h4 className="text-center">Vas a eliminar este momento</h4>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button onClick={onClose} variant="outline-dark">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  this.handleEliminarMomento(momento);
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

  handleEliminarMomento = async (momento) => {
    const ogMomentos = this.state.momentos;
    const momentos = ogMomentos.filter((p) => p._id !== momento._id);
    this.setState({ momentos });

    try {
      await deleteMomento(momento._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Error: el momento ya fue eliminado.");
      }
    }
  };

  handleModificarMomento = (momento) => {
    //reenviar a pagina de modificacion de momento
  };

  handleHabilitarMomento = async (momento, momentostate) => {
    await habilitarMomento(momento, momentostate);
    momento.habilitado = momentostate ? 1 : 0;
  };

  getPageData = () => {
    const allmomentos = [...this.state.momentos];

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const filtered = searchQuery
      ? allmomentos.filter(
          (momento) =>
            momento.nombre
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            momento._id
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (momento.fecha_registro
              ? momento.fecha_registro
                  .toString()
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              : null)
        )
      : allmomentos;

    const sorted = _.orderBy(
      filtered,
      [
        sortColumn.path === "fecha_registro"
          ? function (momento) {
              return momento.fecha_registro === null;
            }
          : filtered,
        sortColumn.path,
      ],
      ["asc", sortColumn.order]
    );

    var momentos = paginate(sorted, currentPage, pageSize);

    return { totalCount: sorted.length, momentos };
  };

  render() {
    if (true) {
      const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

      const { totalCount, momentos } = this.getPageData();
      return (
        <div>
          <div className="w-100 pb-5">
            <Container fluid>
              <h1 className="py-3 mb-0 mt-2 text-center">
                Listado de momentos
              </h1>
              <div className="d-flex justify-content-center my-3">
                <SearchBox
                  value={searchQuery}
                  onChange={this.handleSearchChange}
                  placeholder="Buscar momento..."
                />
                <Link to="/admin/momento/nuevo">
                  <button className="btn btn-primary">Ingresar momento</button>
                </Link>
              </div>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
              <MomentosList
                momentos={momentos}
                sortColumn={sortColumn}
                onEliminar={this.modalEliminarMomento}
                onModificar={this.handleModificarMomento}
                onSort={this.handleSort}
                onHabilitar={this.handleHabilitarMomento}
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

export default MomentosAdmin;
