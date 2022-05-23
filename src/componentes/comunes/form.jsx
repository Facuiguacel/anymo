import React, { Component } from "react";
import Joi from "joi-browser";
import Select from "./select";
import Input from "./input";
import TextArea from "./textarea";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    images: [],
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleChangeFileUpload = (e) => {
    const images = [...this.state.images];
    const image = {
      nombre: e.target.files[0].name,
      dir: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    };
    images.push(image);
    console.log(image);
    this.setState({ images });
  };

  renderSubmitButton(label, style = "btn-primary") {
    return (
      <button disabled={this.validate()} className={`btn ${style}`}>
        {label}
      </button>
    );
  }

  renderFileUpload(name, label) {
    const { errors } = this.state;
    return (
      <Input
        type="file"
        accept="image/*"
        name={name}
        label={label}
        onChange={this.handleChangeFileUpload}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        value={data[name]}
        name={name}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        options={options}
      />
    );
  }

  renderInput(name, label, type = "text", autoFocus) {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        type={type}
        name={name}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        autoFocus={autoFocus}
      />
    );
  }

  renderTextarea(name, label, maxlength = 1000, height = 3) {
    const { data, errors } = this.state;
    return (
      <TextArea
        value={data[name]}
        name={name}
        label={label}
        maxLength={maxlength}
        rows={height}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
