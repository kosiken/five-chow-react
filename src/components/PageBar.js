import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";

import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import Toolbar from "@material-ui/core/Toolbar";
import Close from "@material-ui/icons/Close";

// CheckOut

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

function PageBar(props) {
  const classes = useStyles();

  function logIn(user) {
    props.loginUser(user);
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.link}>
          <IconButton edge="start" color="inherit" aria-label="close">
            <Close />
          </IconButton>
        </Link>
        <Typography variant="h6" className={classes.title}>
          {"500 chow"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default PageBar;
