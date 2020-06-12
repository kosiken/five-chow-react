import React, {useState, useEffect} from "react";
import {connect} from 'react-redux'
import { Link , useHistory, Redirect} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Divider from "@material-ui/core/Divider";
import Button  from "@material-ui/core/Button";
import  Typography from "@material-ui/core/Typography";
import TextField  from "@material-ui/core/TextField";

import {loginUser} from '../store/actions';

import logo from '../assets/logo-meduim.png'
import msvg from '../assets/undraw_walk_in_the_city_1ma6.svg'
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
    flexDirection:'column',
     backgroundColor:'white',
    maxWidth: '500px',
    
    padding: '2em 0',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
opacity: '0.9',
    '&:focus': {
    opacity:'1'
    
    },
    '&:focus-within': {
    opacity:'1'
    
    },


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


function SignUp(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors, clearError, getValues } = useForm();
   let history = useHistory();
  const [authorized, setAuth] = useState(props.isAuthorized)
  


  
  const myfunc = (s) => {
  console.log(history)
  props.loginUser(s);
setAuth(true)

}

	if(authorized) {
		return       <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
	}

  return (
    <div className={classes.div}>
      <form className={classes.root} onSubmit={handleSubmit(myfunc)}>
      <div style={{
      padding: '1em'}}>
          <Link  to="/">
      	<img src={logo} style={{
   
      	width:'60px'
      	}} />
      </Link>
      </div>
        <div className={classes.inputDiv} >
          <TextField
            label="Email"
            style={{ width: "100%" }}
            color="secondary"
            name={"email"}
            variant="outlined"
            className={classes.input}
            inputProps={{
              style: {
                width: "100%",
                backgroundColor: "white",
              },
              ref:register({
                required:{
                  value: true,
                  message: "Email is required"
                }, 
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                  message: "Invalid Email Address"
                }
              })
            }}

          
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </div>
        <div className={classes.inputDiv} >
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
              ref:register({
                required:{
                  value: true,
                  message: "Password is required"
                }, 
                min: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })
            }}

          
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>
        <div className={classes.inputDiv} >
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
              ref:register
            }}
            
            
            error={getValues("password") !==  getValues("password2")  }
            helperText={(getValues("password") !==  getValues("password2"))? "Passwords don't match": ""}
          />
          
          
        </div>
        
        <div className={classes.inputDiv} >

      
         <Button variant="contained" className={classes.btn} color="primary" type="submit">SignUp</Button>
     </div>
        
        <Link to="/login" className={classes.inputDiv}> <Button   className={classes.btn}> Already signed up? </Button>       </Link>
      </form>
       	<img src={msvg} style={{
   position: 'absolute',
   zIndex: '-1'
      	
      	}} />
    </div>
  );
}

const mapStateToProps = function (state) {

return {
isAuthorized:state.auth.isAuthorized
}
}
export default connect(mapStateToProps, {loginUser})(SignUp)
