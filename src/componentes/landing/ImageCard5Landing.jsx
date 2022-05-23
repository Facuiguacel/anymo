import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Collapse } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 440,
    background: "rgba(0,0,0,0.5)",
  },
  media: {
    width: 100,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#252e35",
    marginTop: "7%",
  },
  desc: {
    fontSize: "1.1rem",
    color: "#ddd",
  },
  title2: {
    textAlign: "center",
    color: "#000",
    fontSize: "4.5rem",
  },
  card: {
    backgroundColor: "#FFF",
    boxShadow: "0px 0px 15px -5px",
    height: "160px",
    width: "",
  },
});

export default function ImageCard({ place, checked }) {
  const classes = useStyles();

  return (
    <Collapse
      in={checked}
      {...(checked ? { timeout: 1000 } : {})}
      style={{ width: "70%" }}
    >
      <div style={{ height: 254, margin: "30px" }}>
        <CardMedia
          style={{ borderRadius: "50%" }}
          className={classes.media}
          image={place.imageUrl}
          title="Testimonio"
        />

        <div className={classes.card}>
          <CardContent
            style={{
              display: "flex",
              flexFlow: "column",
              textAlign: "center",
              heigh: "200px",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{ color: "rgba(37,46,53,0.85)" }}
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >
              {place.description}
            </Typography>
            <Typography
              style={{ color: "rgba(37,46,53,0.8)" }}
              gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}
            >
              {place.title}
            </Typography>
          </CardContent>
        </div>
      </div>
    </Collapse>
  );
}
