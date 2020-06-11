import React from "react";

import { makeStyles } from "@material-ui/core/styles";
// import  from '@material-ui/core/TextField';
 import {connect} from 'react-redux'
import { Button, Typography, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import {loginUser} from '../store/actions';

import logo from '../assets/logo-meduim.png'

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height:'100vh',
     background:'linear-gradient(45deg,#f0324b, #e5298b, #b44dc3)',
        position: 'fixed',
height: '100vh',width: '100vw',
top: 0
  },

  root: {

    width: "80%",
       display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'column', maxWidth: '500px',
    backgroundColor:'white',
    padding: '2em 10px',
    

  },
  link: {
    display: "block",
    width: "100%",
    textAlign: "center",
    textDecoration:"none"
  },
  input: {
    width: "100%",
    
  },
  inputDiv: {
  dusplay:'block',
    marginBottom: "2em",
     width: "80%",

  },
  btn:{margin:'0 auto',   width: "100%", }

}));
function Login(props) {
  const classes = useStyles();
  return (
    <div className={classes.div}>
    
      <form className={classes.root} noValidate>
       <div style={{
      padding: '1em'}}>
      	<img src={logo} style={{
      	height:'80px',
      	width:'80px'
      	}} />
      
      </div>
        <div className={classes.inputDiv}>
          <TextField
            label="email"
            style={{ width: "100%" }}
            name={"email"}
            variant="outlined"
            className={classes.input}
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
            }}
          />
        </div>
        <div className={classes.inputDiv}>
          <TextField
            label="Password"
            style={{ width: "100%" }}
            variant="outlined"
            type="password"
            className={classes.input}
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
            }}
          />
        </div>

        <div>
        <Link className={classes.inputDiv} to="/">  <Button variant="contained" className={classes.btn} color="primary" onClick={()=> {
          
          props.loginUser({email:'lion@e.com'})
          
          }}>Login</Button>
          
          </Link>
        </div>
   
      </form>
    </div>
  );
}


const mapStateToProps = function (state) {

return {
isAuthorized:state.auth.isAuthorized
}
}
export default connect(mapStateToProps, {loginUser})(Login)
