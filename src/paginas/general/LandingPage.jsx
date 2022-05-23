import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import HeaderLanding from "../../componentes/landing/HeroLanding";
import PlaceToVisitLanding from "../../componentes/landing/PlaceToVisitLanding";

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: "100vh",
    // backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg.jpg"})`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "1750px",
  },
}));
export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderLanding />
      <PlaceToVisitLanding />
    </div>
  );
}
