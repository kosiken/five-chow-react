import React, {
  useState, useEffect
} from 'react';
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";

import useWidth from "../hooks/useWidth";


import Order from './Order'
import api from "../api";


const useStyles = makeStyles((theme) => {
  return {
    div: {
    
      background: "transparent",
      padding: "0 0 1.5em 0",
      width: "100vw",
      top: 0,
      minHeight: '100vh',
      overflowY: 'scroll',

    },
    root: {
      width: window.innerWidth > 500 ? "85%" : "100%",
      display: "block",
      padding: '1em',


    },
 

 
    errorDiv: {

      textAlign: 'center',
    },
  }


});




function OrderList(props) {
  const classes = useStyles();
  const [orders, setOrders] = useState([])
  let [isLoading, setLoading] = useState(true);
 const [errorMessage, setErrorMessage] = useState("There was an error completing this request");
  const [error, setError] = useState(false);
 const width = useWidth('90%', '85%');
  function getOrder() {
    if(!isLoading) setLoading(true);
    if (error) handleErrorClose();
    api.getOrders(props.token).then(orders => {
      
      setLoading(false);
      setOrders(orders.filter(order=> order.order_items.length));
  }
  )
      .catch(handleErrorOpen)

  }
  // eslint-disable-next-line 
  useEffect(() => {
   if(!props.static) getOrder();
    // eslint-disable-next-line 
  }, [])
  const handleErrorClose = () => {
    setError(false);
  };
  const handleErrorOpen = (err) => {
console.log(err, err.response)	
if(err.response.status === 401) setErrorMessage("You need to login to view orders");
	    setError(true);
  };

  if (error) {
    return (
      <div className={classes.div} style={
      {
      
        display: "flex",
      alignItems: "center",
      justifyContent: "center",
      }}>
        <Paper style={{
          display: 'flex',
          justifyContent: 'center'
        }} className={classes.root}>
          <div className={classes.errorDiv}>
            <Typography color="primary" variant="h5">
              {errorMessage}
        </Typography>
            <Button onClick={getOrder}>Retry</Button>
          </div>


        </Paper>
      </div>);
  }

  if (isLoading) {
    return (
      
    <div className={classes.div} style={
      {
      
        display: "flex",
      alignItems: "center",
      justifyContent: "center",
      }}>
       
    <Paper style={{
      display: 'flex',
      justifyContent: 'center'
    }} className={classes.root}>
      <CircularProgress />

    </Paper>
    </div>)
  }
if(!orders.length) {

    return (
      <div className={classes.div} style={
      {
      
        display: "flex",
      alignItems: "center",
      justifyContent: "center",
      }}>
    <Paper style={{
      display: 'flex',
      justifyContent: 'center'
    }} className={classes.root}>
      <Typography> No orders yet by you</Typography> 

    </Paper>
    </div>
  )
}

return  (
  <div className={classes.div}>
<div style={{
width,
display: 'flex',
'flex-direction': 'column',
'align-items': 'center',
margin:'0 auto',
}}>
   {orders.map(order => (<Order static order={order}/>))}
</div>
  </div>
)

}

const mapStatetoProps = (state) => {
  return {

    token: state.auth.token,


  };
};

export default connect(mapStatetoProps, null)(OrderList);
