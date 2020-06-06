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


    const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
      fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },link: {
  
  display:'block',
  width: '100%',
  textAlign:'center'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Cart (){

const classes = useStyles();
  const [state , setState] = useState({
  modal: false,
  checked: false
  });
  
  function setModal(value) {
  setState({ ...state, modal: value});
  
  
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  
  
  

return (

<div>
     <Fab className={classes.fab} variant="extended" color="secondary" onClick={()=> {
           setModal(true)
         }} >
                <ShoppingCart/>
                 Shopping Cart
            </Fab>
<Dialog fullScreen open={state.modal} onClose={()=> {
                setModal(false)
              }} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=> {
                setModal(false)
              }}
              aria-label="close"
            >
              <Close />
            </IconButton>
            
            
            <Typography variant="h6" className={classes.title}>
              {'500 chow'}
            </Typography>
              <MSwitch
        checked={state.checked}
        onChange={handleChange}
        name="checked"
        color="accent"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      
        <Typography variant="span" >
              {'login'}
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Router>
             <Switch>
          <Route exact path="/">
              <CartItems />
          </Route>
          <Route path="/checkout">
            <p>checkout</p>
          </Route>
          <Route path="/login">
            <p>login</p>
          </Route>
          
            <Route path="/signup">
            <p>signup</p>
          </Route>
        </Switch>
        
        <Link className={classes.link} to={state.checked? 'checkout': 'login'} > <Button onClick={()=> {
          setState({...state, checked: true})
        }}>Confirm</Button> </Link>     
        </Router>
     
       
           
      </Dialog>
</div>
)

}


export default Cart
