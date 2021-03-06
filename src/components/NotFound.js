import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import logo from "../assets/logo-meduim.png";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  
    position: "fixed",
    width: "100vw",
    top: 0,
  },
  paper: {
    padding: "25px",
  },
}));

/**
 * Component rendered at routes that are not found
 * @component
 */
function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <Paper className={classes.paper} elevation={3}>
        <div
          style={{
            padding: "1em",
            textAlign: "center",
          }}
        >
          <Link to="/">
            <img
              alt="logo"
              src={logo}
              style={{
                width: "60px",
              }}
            />
          </Link>
        </div>

        <Typography
          variant="h3"
          style={{ textAlign: "center" }}
          color="primary"
          gutterBottom
        >
          {"404"}
        </Typography>
        <Typography variant="h6" gutterBottom>
          We cant find that page
        </Typography>
      </Paper>

    </div>
  );
}

export default NotFound;
