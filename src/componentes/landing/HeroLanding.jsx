import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse } from "@material-ui/core";

import ExpandMore from "@material-ui/icons/ExpandMore";

import foundImage from "../../assets/img/foundImage-noBG.png";
import { Link as Scroll } from "react-scroll";
import styled from "styled-components";
import { Button } from "react-bootstrap";

import "./HeroLanding.css";

const Styles = styled.div``;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",

    fontFamily: "Nunito",
  },
  appbar: {
    background: "none",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  colorText: {
    color: "FFAB5C",
  },
  container: {
    textAlign: "center",
  },
  title: {
    color: "#000",
    fontSize: "4.5rem",
    marginLeft: "7.5%",
  },
  text: {
    marginLeft: "7.5%",
  },
  goDown: {
    color: "#F3BE44",
    fontSize: "4rem",
  },
}));
export default function HeaderLanding() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Styles>
      <div id="header">
        <Collapse
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          collapsedSize={50}
        >
          <div className="card">
            <div className="hero-container">
              <div className="hero-focus-wrapper">
                <div className="hero-body">
                  <h1> Suscribe </h1>
                  <h1> Descubre </h1>
                  <h1> Siente </h1>
                  <h2>
                    Experimenta tus momentos preferidos con productos de todo
                    tipo.
                  </h2>

                  <Button
                    to="/iniciarsesion"
                    href="/iniciarsesion"
                    className="comenzar-button"
                    variant="info"
                  >
                    {" "}
                    COMENZAR{" "}
                  </Button>
                </div>
                <figure className="hero-image-wrap">
                  <img className="hero-img" src={foundImage} alt=""></img>
                </figure>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontVariantCaps: "small-caps",
                  color: "#000",
                }}
              >
                <Scroll to="place-to-visit" smooth={true}>
                  <p style={{ marginBottom: "0" }}> CONOCER MAS</p>
                  <ExpandMore style={{}} className={classes.goDown} />
                </Scroll>
              </div>
            </div>
          </div>

          {/* <div className={classes.container}>
          <h1 className={classes.title}>
            Bienvenido a <br />
            Any<span className={classes.colorText}>Mo</span>
          </h1>
          */}
        </Collapse>
      </div>
    </Styles>
  );
}
