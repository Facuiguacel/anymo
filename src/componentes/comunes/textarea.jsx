import React from "react";

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea {...rest} name={name} id={name} className="form-control" />
      {error && <p style={{ color: "crimson", paddingTop: "3px" }}>{error}</p>}
    </div>
  );
};

export default TextArea;
