import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useLocation, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import api from "../api";

import { loginUser } from "../store/actions";
import msvg from "../assets/undraw_walk_in_the_city_1ma6.svg";
import logo from "../assets/logo-meduim.png";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(45deg,#f0324b, #e5298b, #b44dc3)",
   

    width: "100vw",
    top: 0,
  },

  root: {
    width: window.innerWidth > 500 ? "80%" : "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    maxWidth: "500px",
    backgroundColor: "white",

    padding: "2em 0",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    opacity: "0.9",
    "&:focus": {
      opacity: "1",
    },
    "&:focus-within": {
      opacity: "1",
    },
  },
  link: {
    display: "block",
    width: "100%",
    textAlign: "center",
    textDecoration: "none",
  },
  input: {
    width: "100%",
  },
  inputDiv: {
    dusplay: "block",
    marginBottom: "2em",
    width: window.innerWidth > 500 ? "80%" : "88%",
  },
  btn: { margin: "0 auto", width: "100%" },

  actiondiv: {
    display: "flex",
    width: window.innerWidth > 500 ? "80%" : "88%",
    justifyContent: "space-around",
    marginBottom: "2em",
  },
}));

/**
 * This component is rendered at the login page
 * @component
 */
function Login(props) {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();

  const location = useLocation().search;

  const [authorized, setAuth] = useState(props.isAuthorized);
  let [isLoading, setLoading] = useState(false);

  const [errorMessage, setErrorM] = useState("There was an error");
  const [open, setOpen] = useState(false);

  /**
   * This is the callback called when the form is submitted by the
   * useForm hook https://react-hook-form.com
   * @param {FormData} s
   */
  const handleSubmitCallback = (s) => {
    if (!props.debug) {
      setLoading(true);
      api
        .logIn(s)
        .then((d) => {
          props.loginUser(d);
          setAuth(true);
        })
        .catch((d) => {
          try {
            console.log(d.response, "kk");
            let status = d.status || d.response.status;
            // let data = d.data || d.response.data;

            if (status === 400) {
              setErrorM("Email or Password incorrect");
            }
          } catch (err) {
            console.log(d, JSON.stringify(d));
            setErrorM("There was a cors error");
          }
          setLoading(false);
          setOpen(true);

          return;
        });

      return;
    }
    props.loginUser({ email: s.username });
    setAuth(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (authorized) {
    return (
      <Redirect
        to={{
          pathname: location ? "/" + location.split("=")[1] : "/",
          state: { from: props.location },
        }}
      />
    );
  }

  return (
    <div className={classes.div}>
      <form
        className={classes.root}

        onSubmit={handleSubmit(handleSubmitCallback)}
      >
        <div
          style={{
            padding: "1em",
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
        <div className={classes.inputDiv}>
          <TextField
            color="secondary"
            label="Email or Phone"
            style={{ width: "100%" }}
            name={"username"}
            variant="outlined"
            className={classes.input}
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
              ref: register({
                required: {
                  value: true,
                  message: "You have to enter an email or phone number",
                },
              }),
            }}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </div>
        <div className={classes.inputDiv}>
          <TextField
            label="Password"
            style={{ width: "100%" }}
            variant="outlined"
            type="password"
            name="password"
            className={classes.input}
            color="secondary"
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
              ref: register({
                required: {
                  value: true,
                  message: "Password is required",
                },
              }),
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>

        {/*  <div className={classes.actiondiv}>
          <Link to="/forgotpassword">
            <Button color="primary">Forgot Password</Button>
          </Link>
        
        </div>*/}
        <div className={classes.inputDiv}>

          <Button
            variant="contained"
            className={classes.btn}
            disabled={isLoading}
            color="primary"
            type="submit"
          >
            Login
          </Button>

          <Link to={"/signup" + location}>
            <Button className={classes.btn} style={{

              marginTop: "1em",
            }} color="secondary">
              Sign Up
            </Button>
          </Link>
        </div>
      </form>

      <img
        alt="mysource"
        src={msvg}
        style={{
          position: "absolute",
          zIndex: "-1",
        }}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

Login.propTypes = {
  /**
   * This value shows whether the user is already logged in, in that case
   * we need to redirect the user away from this page
   */
  isAuthorized: PropTypes.bool.isRequired,

  /**
   * Check to see if we are in production
   */
  debug: PropTypes.bool.isRequired,

  /**
   * Action to log in the a user after a
   * successful api request 
   */
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
  return {
    isAuthorized: state.auth.isAuthorized,
    debug: state.auth.debug,
  };
};
export default connect(mapStateToProps, { loginUser })(Login);
