import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import  from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider";
import { Button, Typography, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height:'100%'
  },
  root: {
    display: "block",
    width: "80%",
  },
  link: {
    display: "block",
    width: "100%",
    textAlign: "center",
    
  },  link: {
    display: "block",
    width: "100%",
    textAlign: "center",
    textDecoration:"none"
  }

  input: {
    width: "100%",
    maxWidth: '300px'

  },
  inputDiv: {
    marginBottom: '2em'
  }
}));
function SignUp() {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <form className={classes.root} noValidate>
        <div className={classes.inputDiv} >
          <TextField
            label="email"
            style={{ width: "100%" }}
            name={"email"}
            variant="outlined"
            classes={classes.input}
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
            }}
          />
        </div>
        <div className={classes.inputDiv} >
          <TextField
            label="Password"
            style={{ width: "100%" }}
            variant="outlined"
            type="password"
            classes={classes.input}
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
            }}
          />
        </div>
        <div className={classes.inputDiv} >
          <TextField
            style={{ width: "100%" }}
            label="Confirm Password"
            variant="outlined"
            type="password"
            classes={classes.input}
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
            }}
          />
        </div>

      
        <Link className={classes.link} to="/">
          <Button variant="raised" color="secondary">SignUp</Button>
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
