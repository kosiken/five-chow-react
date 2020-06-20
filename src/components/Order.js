import React, { useState ,useEffect
} from 'react';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {  useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";

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
    
    }
  

  });
  

function Order(props) {
    const classes = useStyles();
    const [order, setOrder]= useState(null)
    const {id} = useParams();
    useEffect(() => {
        api.getOrder(props.token,id).then(setOrder)
        .catch(console.log)
   
    }, [props.token, id])

    function renderOrders(morder) {
      if(morder){
        return (
          <List>
            {morder.order_items.map(ord=> {
              return (
                <ListItem key={ord.id}>
                  <ListItemText>{ord.food_item.name +" x"+ ord.quantity}</ListItemText>
              <ListItemText>{"NGN"+ord.total_price}</ListItemText>
                </ListItem>
              )
            })}
          </List>
        )
      }

      return (<Typography>Loading</Typography>);
    }
    return (
        <div className={classes.div}>
        <Paper className={classes.root}>
          {renderOrders(order)}
            </Paper>
        </div>
    )
}
const mapStatetoProps = (state) => {
    return {

      token: state.auth.token,
     
     
    };
  };

export default connect(mapStatetoProps, null)(Order);
