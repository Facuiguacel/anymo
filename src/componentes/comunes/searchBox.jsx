import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <InputGroup className="w-50 mb-2">
      <Form.Control
        type="text"
        id="query"
        name="query"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholder || "Buscar..."}
      />
      <InputGroup.Append>
        <InputGroup.Text>
          <FontAwesomeIcon icon="search" />
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchBox;
