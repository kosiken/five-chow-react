import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardActions,
Avatar,
  IconButton
} from "@material-ui/core";
import { connect } from "react-redux";
import {getTotal} from '../constants' 

import { makeStyles } from "@material-ui/styles";
import {grey} from "@material-ui/core/colors/"
import paystack_logo from "../assets/paystack.svg";
const useStyles = makeStyles((theme) =>{
return {

mainDiv:{ display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        height:'100%'
},
root:{
boxShadow:'none',
border:'none',
padding:theme.spacing(5),
textAlign:'center'

},
  checkout: {
    fontStyle: "italic",
   color:'grey'
  },
    small: {
     backgroundColor: 'white',
     borderRaduis:'50%',
 padding: theme.spacing(1),
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight:theme.spacing(1)
  },
  btn: {
   
  backgroundColor: 'rgb(11, 164, 219)',
  color:'white'
  
  },link:{
     


    textDecoration:"none"


}

}});



let defaultProps = { amount: 500 };
function CheckOut(props = { amount: 500 }) {
const classes = useStyles();


let amount = 500;
 if(props) amount = props.amount;
 else amount  = 500
 let total = getTotal(props.shoppingCartItems)
 function renderButton(tots) {
if (tots> 0) {
return (     
          <Button className={classes.btn} variant="contained" color="info"  >
         
  
            <Avatar src={paystack_logo}  
             className={classes.small} /> 
         
            Pay with Paystack
          </Button>
         )
          

}
return (  <Button className={classes.btn} variant="contained" color="info" disabled >
         
  
            <Avatar src={paystack_logo}  
             className={classes.small} /> 
         
            Pay with Paystack
          </Button>)

}

  return (
    <div className={classes.mainDiv}>
      <Card className={classes.root}>
        <CardHeader title="Confirm Transaction" />

        <CardContent>
          <Typography  variant="p" className={classes.checkout}>
           {total > 0 ? ` You are about to confirm transaction of N${total}`: 'You havent ordered anything yet'} 
          </Typography>
        </CardContent>
        <CardActions style={{
        
        display:'flex',
        justifyContent: 'center'
        }}>
     
  {renderButton(total)}
   <div>
          <Link to="/"  className={classes.link} >
          <Button color="error"  >
         
  
          Back
          </Button>
          </Link>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};
export default connect(mapStatetoProps, null )(CheckOut);
