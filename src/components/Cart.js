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
// CheckOut

    const useStyles = makeStyles((theme) => ({
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Cart (){

const classes = useStyles();
  const [state , setState] = useState({
  modal: false,
  checked: false,
  variant: window.innerWidth > 500 ? 'extended':'round'
  
  });
  
  function setModal(value) {
  setState({ ...state, modal: value});
  
  
  }
  
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  
  window.addEventListener('resize', function() {
  
  let v = window.innerWidth > 500 ? 'extended':'round'

 setState({ ...state, variant: v});
}
  )

return (

<div>
     <Fab className={classes.fab} variant={state.variant} color="secondary" onClick={()=> {
           setModal(true)
         }} >
                <ShoppingCart/>
{state.variant === 'extended' ? 'Shopping Cart': ''}
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
              <Link className={classes.link} to={state.checked? 'checkout': 'login'} > <Button onClick={()=> {
          setState({...state, checked: true})
        }}>Confirm</Button> </Link>  
          </Route>
          <Route path="/checkout">
            <CheckOut amount={1000} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          
            <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
        
         
        </Router>
     
       
           
      </Dialog>
</div>
)

}


export default Cart
