import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";

import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

import IconButton from "@material-ui/core/IconButton";
import { loginUser } from "../store/actions";

import Switch from "@material-ui/core/Switch";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Close from "@material-ui/icons/Close";
import PageBarItems from "./PageBarItems";
import Login from "./Login";
import SignUp from "./SignUp";
import CheckOut from "./CheckOut";
import Opener from "./Opener";
import FoodList from "./FoodList";
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
   color: 'white', textDecoration:'none'
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
          <Link
            to="/"
          className={classes.link}
          >
            <IconButton edge="start" color="inherit" aria-label="close">
              <Close />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            {"500 chow"}
          </Typography>
          <Switch
            checked={state.isAuthorized}
            onChange={handleChange}
            name="checked"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />

          <Typography variant="span">{"login"}</Typography>
        </Toolbar>
      </AppBar>
   
  );
}

export default PageBar;
