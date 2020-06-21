import React, {
  useState, useEffect
} from 'react';
import { connect } from "react-redux";
import moment from 'moment'
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from '@material-ui/core/Chip';
import ListItem from "@material-ui/core/ListItem";
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
      background: "linear-gradient(45deg,#f0324b, #e5298b, #b44dc3)",
      padding: "0 0 1.5em 0",
      width: "100vw",
      top: 0,
      height: '100%'
    },
    root: {
      width: window.innerWidth > 500 ? "85%" : "90%",
      display: "block",
      padding: '1em',


    },
     greyDiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor:'#011627',
        padding: '1em',
        color: 'white'
    },
    infoDiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
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
    }
  }


});

const statuses = [
  "Processing",
  "Submitted",
  "Accepted",
  "Shipped",
  "Delivered",
  "Cancelled"];

function Order(props) {
  const classes = useStyles();
  const [order, setOrder] = useState(null)
  const { id } = useParams();
  useEffect(() => {
    api.getOrder(props.token, id).then(setOrder)
      .catch(console.log)

  }, [props.token, id])

  function renderOrders(morder) {

    if (morder) {
      const status = statuses[morder.status];
      return (
        <div className={classes.root}>
        
        <div className={classes.greyDiv}>
          <Chip className={classes[status]} label={status} />
          <Typography>{morder.order_items[0].food_item.vendor.name}</Typography>
          <Typography>{moment(morder.created_at).format('MMMM Do YYYY, h:mm a')}</Typography>
           </div>
         <Paper style={{ padding: '1em',}}>
          <List>

            {morder.order_items.map(ord => {
              return (
                <ListItem key={ord.id}>
                  <ListItemText><span style={{fontWeight: 'bold'}}>{ord.quantity + "x "}</span>{ord.food_item.name}</ListItemText>
                  <ListItemText>{"NGN" + ord.total_price}</ListItemText>

                </ListItem>
              )
            })}
          </List>
        <Divider/>
          <div className={classes.infoDiv} >
            <span>Total</span> <Typography style={{fontWeight: 'bold'}}>{morder.total_order_price}</Typography>
          </div>
          </Paper>
        
        </div>
      )
    }

    return (  <Paper style={{
    display:'flex',
    justifyContent:'center'   
    }} className={classes.root}>
    <CircularProgress  />
            
    </Paper>);
  }
  return (
    <div className={classes.div}>
     
        {renderOrders(order)}
     
    </div>
  )
}
const mapStatetoProps = (state) => {
  return {

    token: state.auth.token,


  };
};

export default connect(mapStatetoProps, null)(Order);
