import React from "react";
import { Form, Alert, Row, Col } from "react-bootstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import { useState } from "react";
import valid from "card-validator";

const Styles = styled.div`
  .card-base {
    background-color: #e4e4e4;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 8px -5px;
    max-width: 100%;
    padding: 20px;
  }
  .row {
    justify-content: space-evenly;
  }
  .tarjeta {
    margin-right: 5px;
  }
  .datos {
    min-width: 45%;
    margin-left: 5px;
  }

  .alert {
    text-align: center;
    margin-top: 20px;
  }
  #alertMessage {
    margin-bottom: 0;
  }
  .alert {
    margin-top: 10px;
    padding: 0;
  }
  @media only screen and (max-width: 460px) {
    .card-base {
      padding: 10px;
    }
    .tarjeta,
    .datos {
      margin: 0;
    }
  }
  @media only screen and (max-width: 953px) {
    .datos {
      margin-top: 10px;
      margin-left: 0;
    }
  }
`;

const CreditCardForm = ({
  datosPago: values,
  setDatosPago: setValues,
  setDatosPagoValidos,
}) => {
  const [errors, setErrors] = useState({});

  const validateInfo = (values) => {
    let errors = {};
    let creditCard = valid.number(values.cardNumber);

    creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
    creditCard.cvv = valid.cvv(values.cardSecurityCode);
    creditCard.cardholderName = valid.cardholderName(values.cardName);

    errors.show = true;
    errors.variant = "danger";
    errors.message = "Error inesperado. Por favor, intente más tarde.";
    errors.cname = false;
    errors.cnumber = false;
    errors.cexp = false;
    errors.ccvv = false;

    //Card CVV expiration
    if (values.cardSecurityCode === null || !values.cardSecurityCode.trim()) {
      errors.message = "Código de seguridad no completo";
    } else if (creditCard.cvv.isValid) {
      errors.ccvv = true;
    } else {
      errors.message = "Código de seguridad no válido";
    }

    //Card Expiration Verification
    if (values.cardExpiration === null || !values.cardExpiration.trim()) {
      errors.message = "Fecha de vencimiento no completa";
    } else if (creditCard.expirationDate.isValid) {
      errors.cexp = true;
    } else {
      errors.message = "Fecha de vencimiento no válida";
    }

    //Card Number Verification
    if (values.cardNumber === null || !values.cardNumber.trim()) {
      errors.message = "Número de tarjeta no completo";
    } else if (creditCard.isValid) {
      errors.cnumber = true;
    } else {
      errors.message = "Número de tarjeta no válido";
    }

    //Cardholder Name Verification
    if (values.cardName === null || !values.cardName.trim()) {
      errors.message = "Nombre no completado";
    } else if (creditCard.cardholderName.isValid) {
      errors.cname = true;
    } else {
      errors.message = "Nombre no válido";
    }

    if (errors.cname && errors.cnumber && errors.cexp && errors.ccvv) {
      setDatosPagoValidos(true);
      errors.variant = "success";
      errors.message = "Tarjeta de crédito válida";
    } else {
      setDatosPagoValidos(false);
    }

    return errors;
  };

  const handleFocus = (e) => {
    setValues({
      ...values,
      focus: e.target.name === "cardSecurityCode" ? "cvc" : e.target.name,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors(
      validateInfo({
        ...values,
        [name]: value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
  };
  return (
    <div>
      <Styles>
        <div className="card-base">
          <div className="row no-gutters">
            <div className="tarjeta col">
              <Cards
                cvc={values.cardSecurityCode}
                expiry={values.cardExpiration}
                focused={values.focus}
                name={values.cardName}
                number={values.cardNumber}
                placeholders={{ name: "TU NOMBRE AQUÍ" }}
              />
            </div>
            <div className="col datos">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="cardName"
                    data-testid="cardName"
                    name="cardName"
                    placeholder="Nombre"
                    value={values.cardName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cname}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="cardNumber"
                    data-testid="cardNumber"
                    name="cardNumber"
                    placeholder="Número de tarjeta"
                    value={values.cardNumber}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cnumber}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-0">
                      <Form.Control
                        type="text"
                        id="cardSecurityCode"
                        data-testid="cardSecurityCode"
                        name="cardSecurityCode"
                        placeholder="Cód. seguridad"
                        value={values.cardSecurityCode}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        isValid={errors.ccvv}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-0">
                      <Form.Control
                        type="text"
                        id="cardExpiration"
                        data-testid="cardExpiration"
                        name="cardExpiration"
                        placeholder="Fecha de vencimiento"
                        value={values.cardExpiration}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        isValid={errors.cexp}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Alert
                  id="alertMessage"
                  data-testid="alertMessage"
                  variant={errors.variant}
                  show={errors.show}
                >
                  {errors.message}
                </Alert>
              </Form>
            </div>
          </div>
        </div>
      </Styles>
    </div>
  );
};

export default CreditCardForm;
