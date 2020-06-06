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
  
  },

}});



let defaultProps = { amount: 500 };
function CheckOut(props = { amount: 500 }) {
const classes = useStyles();

let amount = 500;
 if(props) amount = props.amount;
 else amount  = 500
  return (
    <div className={classes.mainDiv}>
      <Card className={classes.root}>
        <CardHeader title="Confirm Transaction" />

        <CardContent>
          <Typography  variant="p" className={classes.checkout}>
            You are about to confirm transaction of N{amount.toString()}
          </Typography>
        </CardContent>
        <CardActions style={{
        
        display:'flex',
        justifyContent: 'center'
        }}>
          <Button className={classes.btn} variant="contained" color="info" >
         
  
            <Avatar src={paystack_logo}  
             className={classes.small} /> 
         
            Pay with Paystack
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default CheckOut;
