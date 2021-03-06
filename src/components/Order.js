import React, {
  useState, useEffect
} from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import CircularProgress from '@material-ui/core/CircularProgress';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import Chip from '@material-ui/core/Chip';
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

import Divider from "@material-ui/core/Divider";
import { red, green, deepPurple, blue } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";


import api from "../api";

const useStyles = makeStyles((theme) => {
  return {
    div: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   
      padding: "0 0 1.5em 0",
      width: "100vw",
      top: 0,
   minHeight: "100vh",
    },
    root: {
      width: window.innerWidth > 500 ? "85%" : "100%",
      display: "block",
      padding: '1em',


    },
    greyDiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#011627',
      padding: '1em',
      color: 'white'
    },
    infoDiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '10px'
    },

    Cancelled: {
      backgroundColor: red[500]
    },
    Processing: {
      backgroundColor: '#ffc107'
    },
    Accepted: {
      backgroundColor: blue[500]
    },
    Delivered: {
      backgroundColor: green[500]
    },
    Shipped: {
      backgroundColor: deepPurple[500]
    },
    Submitted: {
      backgroundColor: '#551a8b'
    },
    errorDiv: {

      textAlign: 'center',
    },
  }


});

const statuses = [
  "Processing",
  "Submitted",
  "Accepted",
  "Shipped",
  "Delivered",
  "Cancelled"];

/**
 * Renders an order item 
 * @component
 *  
 */
function Order(props) {

  const classes = useStyles();
  const [error, setError] = useState(false);
  const [order, setOrder] = useState(null)

  const { id } = useParams();

  function getOrder() {

    if (error) handleErrorClose();

    api.getOrder(props.token, id).then(setOrder)
      .catch(handleErrorOpen)

  }


  useEffect(() => {
   if(!props.static) getOrder();
    // eslint-disable-next-line 
  }, [])
  const handleErrorClose = () => {
    setError(false);
  };
  const handleErrorOpen = (m) => {

    setError(true);
  };
  function renderOrders(morder) {

    if (morder) {
      const status = statuses[morder.status];
      return (
        <div className={classes.root}>

          <div className={classes.greyDiv}>
            <Chip className={classes[status]} label={status} />
            <Typography>{morder.order_items[0].food_item.vendor.name}</Typography>
           
          </div>
          <Paper >
            <List>

              {morder.order_items.map(ord => {
                if(!ord) return false;
                return (
                  <ListItem key={ord.id}>
                    <ListItemText><span style={{ fontWeight: 'bold' }}>{ord.quantity + "x "}</span>{ord.food_item.name}</ListItemText>
                    <ListItemText>{"NGN" + ord.total_price}</ListItemText>

                  </ListItem>
                )
              })}
            </List>
            <Divider />
            <div className={classes.infoDiv} style={{ padding: '1em', }}>
              <span>Total</span> <Typography style={{ fontWeight: 'bold' }}>{morder.total_order_price}</Typography>
            </div>
            <Divider />
            <div className={classes.infoDiv} style={{ padding: '1em', }}>
            <Typography>{moment(morder.created_at).format('MMMM Do YYYY, hh:mm ')}</Typography>
              </div>
          </Paper>

        </div>
      )
    }

    return (<Paper style={{
      display: 'flex',
      justifyContent: 'center'
    }} className={classes.root}>
      <CircularProgress />

    </Paper>);
  }

  if (error) {
    return (
      <div className={classes.div}>
        <Paper style={{
          display: 'flex',
          justifyContent: 'center'
        }} className={classes.root}>
          <div className={classes.errorDiv}>
            <Typography color="primary" variant="h5">
              There was an error completing this request
        </Typography>
            <Button onClick={getOrder}>Retry</Button>
          </div>


        </Paper>
      </div>);


  }
if(props.static) {
  return renderOrders(props.order)
}


  return (
    <div className={classes.div}>

      {renderOrders(order)}

    </div>
  )
}

Order.propTypes = {
    /**
   * The api auth token
   */
  token: PropTypes.string.isRequired,
  /**
   * Tells if the component is standalone or is rendered in another
   * fivechow component
   */
  static: PropTypes.bool,

  /**
   * An order object passed on by a parent component
   */
  order: PropTypes.object

}
const mapStatetoProps = (state) => {
  return {

    token: state.auth.token,


  };
};

export default connect(mapStatetoProps, null)(Order);
