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
    height: 440,
  },
  title: {
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#fff",
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
});

export default function ImageCard({ place, checked }) {
  const classes = useStyles();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <div style={{ width: 440, height: 540, margin: "30px" }}>
        <CardContent>
          <CardMedia
            className={classes.media}
            image={place.imageUrl}
            title="Contemplative Reptile"
          />

          <Typography
            style={{
              color: "rgba(43,45,55,0.5)",
              textAlign: "left",
            }}
            gutterBottom
            variant="h5"
            component="h1"
            className={classes.title}
          >
            {place.title}
          </Typography>

          <Typography
            style={{
              color: "rgba(0,0,0,0.5)",
              textAlign: "left",
            }}
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {place.description}
          </Typography>
        </CardContent>
      </div>
    </Collapse>
  );
}
