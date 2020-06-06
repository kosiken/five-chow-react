import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import  from '@material-ui/core/TextField';
import { Button, Typography, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    width: "80%",
  },
  link: {
    display: "block",
    width: "100%",
    textAlign: "center",
  },
}));
function Login() {
  const classes = useStyles();
  return (
    <div>
      <form className={classes.root} noValidate>
        <div>
          <TextField
            error
            id="filled-error"
            label="email"
            defaultValue="Hello World"
            variant="filled"
            type="email"
          />
        </div>
        <div>
          <TextField
            error
            id="filled-error"
            label="Password"
            defaultValue="Hello World"
            variant="filled"
            type="password"
          />
        </div>

        <div>
          <Button>Login</Button>
        </div>
        <Link className={classes.link} to="/">
          <Button>Login</Button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
