import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Link, useLocation, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import api from "../api";
import { loginUser } from "../store/actions";

import logo from "../assets/logo-meduim.png";
import msvg from "../assets/undraw_walk_in_the_city_1ma6.svg";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(45deg,#f0324b, #e5298b, #b44dc3)",
    position: "fixed",

    width: "100vw",
    top: 0,
  },

  root: {
    width: window.innerWidth > 500 ? "80%" : "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    maxWidth: "500px",

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

  phoneInputDiv: {
    display: "flex",
    width: "80%",
    alignItems: "center",
    marginBottom: "2em",
  },
  numspan: {
    marginRight: '10px',
  },
}));

/**
 * This component is rendered at the signup page
 * @component
 */
function SignUp(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors, getValues } = useForm();

  const [authorized, setAuth] = useState(props.isAuthorized);
  const [errorMessage, setErrorM] = useState("There was an error");
  let [isLoading, setLoading] = useState(false);
  const location = useLocation().search;

  const [open, setOpen] = useState(false);

  /**
    * This is the callback called when the form is submitted by the
    * useForm hook https://react-hook-form.com
    * @param {FormData} s
    */
  const handleSubmitCallback = (s) => {
    setLoading(true);
    if (!props.debug) {
      api
        .signUp(s)
        .then((d) => {
          //setLoading(false)

          props.loginUser(d);
          setAuth(true);
        })
        .catch((d) => {
          try {
            console.log(d.response, "kk");
            let status = d.status || d.response.status;
            let data = d.data || d.response.data;

            if (status === 400) {
              let er = "";
              for (let key in data) {
                er += data[key][0] + ", ";
              }
              er = er.slice(0, er.length - 2);
              setErrorM(er);
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
    props.loginUser(s);
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
      <form className={classes.root} onSubmit={handleSubmit(handleSubmitCallback)}>
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
            label="Email"
            style={{ width: "100%" }}
            color="secondary"
            name={"email"}
            type="email"
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
                  message: "Email is required",
                },
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                  message: "Invalid Email Address",
                },
              }),
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </div>
        <div className={classes.phoneInputDiv}>
          <span className={classes.numspan}> {"+234"} </span>
          <TextField
            label="Phone Number"
            style={{ width: "100%" }}
            color="secondary"
            name={"phone"}
            variant="outlined"
            type="tel"
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
              ref: register({
                required: {
                  value: true,
                  message: "Email Phone Number",
                },

                min: {
                  value: 10,
                  message: "Invalid Phone Number",
                },
              }),
            }}
            error={!!errors.phone}
            helperText={errors.phone?.message}
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
                min: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }),
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>
        <div className={classes.inputDiv}>
          <TextField
            style={{ width: "100%" }}
            label="Confirm Password"
            variant="outlined"
            color="secondary"
            type="password"
            name="password2"
            className={classes.input}
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
              ref: register,
            }}
            error={getValues("password") !== getValues("password2")}
            helperText={
              getValues("password") !== getValues("password2")
                ? "Passwords don't match"
                : ""
            }
          />
        </div>

        <div className={classes.inputDiv}>
          <Button
            variant="contained"
            className={classes.btn}
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            SignUp
          </Button>
        </div>

        <Link to="/login" className={classes.inputDiv}>
          {" "}
          <Button className={classes.btn}> Already signed up? </Button>{" "}
        </Link>
      </form>
      <img
        src={msvg}
        alt="bgImg"
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

SignUp.propTypes = {
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
export default connect(mapStateToProps, { loginUser })(SignUp);
