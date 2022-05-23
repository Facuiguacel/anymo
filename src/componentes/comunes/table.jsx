import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Table } from "react-bootstrap";

const Tablez = ({ data, columns, sortColumn, onSort, headerStlyes }) => {
  return (
    <Table className="table" striped bordered hover responsive>
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        styles={headerStlyes}
      />
      <TableBody data={data} columns={columns} />
    </Table>
  );
};

export default Tablez;
