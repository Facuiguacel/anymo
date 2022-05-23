import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

// columns: array
// sortColumn: object
// onSort: func

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    if (column.sortable) {
      const { sortColumn } = this.props;
      if (column.path !== sortColumn.path)
        return <FontAwesomeIcon className="ml-3" icon="sort" />;
      if (this.props.sortColumn.order === "asc")
        return <FontAwesomeIcon className="ml-3" icon="sort-up" />;
      else return <FontAwesomeIcon className="ml-3" icon="sort-down" />;
    }
  };

  render() {
    return (
      <thead className="text-center" style={this.props.styles}>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="align-middle clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.sortable ? column.path : "")}
              style={{ cursor: "pointer" }}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
