import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCardLanding2 from "./ImageCard2Landing";
import ImageCardLanding3 from "./ImageCard3Landing";
import ImageCardLanding5 from "./ImageCard5Landing";
import places from "../../paginas/static/places";
import { Collapse } from "@material-ui/core";
import useWindowPosition from "../../paginas/hook/useWindowPosition";
import "./Benefits.css";
import "./HowItWorks.css";
import "./GrandesMarcas.css";
import { Col, Row } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },

  hr: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    textAlign: "center",
    color: "rgba(20,40,0,0.7)",
    fontSize: "3.5rem",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },

    hdivider: {
      marginTop: "5px",
      marginBottom: "5px",
      height: "1px",
      width: "100%",
      borderTop: "2px solid rgba(0, 0, 0, 0.6)",
    },
  },
}));

export default function PlaceToVisitLanding() {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div>
      <div
        className="benefits-card"
        style={{ marginTop: "50px", paddingTop: "3rem" }}
      >
        <div id="place-to-visit">
          <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <div className={classes.title}>Beneficios</div>
          </Collapse>

          <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <div className={classes.root}>
              <Row className="benefit-cards-wrapper">
                <Col className="benefit-item">
                  <figure className="benefit-img-wrap">
                    <img
                      src="assets/Variedad.png"
                      alt="FacilDeUsar"
                      className="benefit-img"
                    />
                  </figure>
                  <div className="benefit-body">
                    <h4 className="benefit-title">{places[1].title}</h4>
                    <p className="benefit-description">
                      {places[1].description}
                    </p>
                  </div>
                </Col>
                <Col className="benefit-item">
                  <figure className="benefit-img-wrap">
                    <img
                      src="assets/FacilDeUsar.png"
                      alt="Variedad"
                      className="benefit-img"
                    />
                  </figure>
                  <div className="benefit-body">
                    <h4 className="benefit-title">{places[0].title}</h4>
                    <p className="benefit-description">
                      {places[0].description}
                    </p>
                  </div>
                </Col>
                <Col className="benefit-item">
                  <figure className="benefit-img-wrap">
                    <img
                      src="assets/Calidad.png"
                      alt="Calidad"
                      className="benefit-img"
                    />
                  </figure>
                  <div className="benefit-body">
                    <h4 className="benefit-title">{places[2].title}</h4>
                    <p className="benefit-description">
                      {places[2].description}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Collapse>
        </div>{" "}
      </div>
      <div className="hiw-card">
        <div id="place-to-visit2">
          <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <div className={classes.title}>¿Cómo funciona?</div>
          </Collapse>

          <div className={classes.root}>
            <ImageCardLanding2 place={places[3]} checked={checked} />
            <ImageCardLanding2 place={places[4]} checked={checked} />
            <ImageCardLanding2 place={places[5]} checked={checked} />
          </div>
        </div>
      </div>{" "}
      <div style={{ marginBottom: "2rem" }}>
        <div id="place-to-visit3">
          <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <div className={classes.title}>Momentos Destacados</div>
          </Collapse>

          <div className={classes.root}>
            <ImageCardLanding3 place={places[6]} checked={checked} />
            <ImageCardLanding3 place={places[7]} checked={checked} />
            <ImageCardLanding3 place={places[8]} checked={checked} />
          </div>
        </div>
      </div>
      <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}></Collapse>
      <div id="place-to-visit4" style={{ margin: "0 0 50px" }}>
        <div
          className="brands-card"
          styles={{ width: "100%", alignItems: "center", height: "300" }}
          style={{ marginBottom: "0rem" }}
        >
          <div className="container">
            <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
              <div className={classes.title}>Grandes Marcas</div>
            </Collapse>
            <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
              <div className="row" style={{ margin: "30px 0" }}>
                <figure className="">
                  <img
                    src="assets/Apple-logo.png"
                    alt="Apple-logo"
                    className="logo"
                  />
                </figure>
                <figure className="">
                  <img
                    src="assets/McDonalds-logo.png"
                    alt="McDonalds-logo"
                    className="logo"
                  />
                </figure>
                <figure className="">
                  <img
                    src="assets/Nike-logo.png"
                    alt="Nike-logo"
                    className="logo"
                  />
                </figure>
                <figure className="">
                  <img
                    src="assets/Starbucks-logo.png"
                    alt="Starbucks-logo"
                    className="logo"
                  />
                </figure>
                <figure className="">
                  <img
                    src="assets/Converse-logo.png"
                    alt="Converse-logo"
                    className="logo"
                  />
                </figure>
                <figure className="">
                  <img
                    src="assets/Yenny-logo.png"
                    alt="Yenny-logo"
                    className="logo"
                  />
                </figure>
                <figure className="">
                  <img
                    src="assets/Sony-logo.png"
                    alt="Sony-logo"
                    className="logo"
                  />
                </figure>
                <figure className="">
                  <img
                    src="assets/Levis-logo.png"
                    alt="Levis-logo"
                    className="logo"
                  />
                </figure>
                <figure className="">
                  <img
                    src="assets/Nvidia-logo.png"
                    alt="Nvidia-logo"
                    className="logo"
                  />
                </figure>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "5rem" }}>
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
          <div className={classes.title}>Testimonios</div>
        </Collapse>
        <div id="place-to-visit5">
          <div className={classes.root} style={{ alignItems: "center" }}>
            <ImageCardLanding5 place={places[11]} checked={checked} />
            <ImageCardLanding5 place={places[10]} checked={checked} />
            <ImageCardLanding5 place={places[9]} checked={checked} />
          </div>
        </div>
      </div>
    </div>
  );
}
