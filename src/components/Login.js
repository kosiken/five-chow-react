import React from "react";

import { makeStyles } from "@material-ui/core/styles";
// import  from '@material-ui/core/TextField';
 import {connect} from 'react-redux'
import Button  from "@material-ui/core/Button";
import  Typography from "@material-ui/core/Typography";
import TextField  from "@material-ui/core/TextField";
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
       
    padding: '2em 0',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
    

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
      <Link  to="/">
      	<img src={logo} style={{
   
      	width:'60px'
      	}} />
      </Link>
      </div>
        <div className={classes.inputDiv}>
          <TextField
          color="secondary"
            label="Email"
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
          color="secondary"
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
        <Link className={classes.inputDiv}  to="/forgotpassword">  <Button  className={classes.btn} color="primary">Forgot Password</Button>
          </Link>
        <Link  to="/">  <Button variant="contained" className={classes.btn} color="primary" onClick={()=> {
          
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
