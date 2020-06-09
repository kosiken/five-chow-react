import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router,
  Switch,
  Route,
  Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography,
Dialog,IconButton,Switch as MSwitch,
Fab, Slide}from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';



import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Close}from "@material-ui/icons";
import CartItems from './CartItems'
import Login from './Login';
import SignUp from './SignUp';
import CheckOut from './CheckOut';
import Opener from './Opener';
import FoodList from './FoodList'
// CheckOut

    const useStyles = makeStyles((theme) => ({

      root:{

        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw'
      },

  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
      fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },link: {
  
  display:'block',
  width: '100%',
  textAlign:'center'
  }
}));



function Cart (props){


  
  


return (

<div>

       



 <AppBar className={classes.appBar}>


          
<Toolbar>

      <Link to="/" style={{
      color:'white'}}> 
     <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
            >
              <Close />
            </IconButton>
            
            </Link>
            <Typography variant="h6" className={classes.title}>
              {'500 chow'}
            </Typography>
 
          </Toolbar>
        </AppBar>
        
        
            
          
              <CartItems />
              <Link className={classes.link} to={props.isAuthorized? 'checkout': 'login'} > <Button onClick={()=> {
          setState({...state, checked: true})
        }}>Confirm</Button> </Link>  
         
       
</div>
)

}


export default Cart
