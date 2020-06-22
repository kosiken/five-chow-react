import React from "react";
import PropTypes from 'prop-types'
//import Button from "@material-ui/core/Button";

import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Item from "./Item";


const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    
  
  },
  root: {
    maxWidth: 345,
    cursor: "pointer",
    paddingTop: '10px',
    border: '0.5px solid rgba(0, 0, 0, 0.18)',
    minWidth: 150,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },

  content: {
    padding: "12px 15px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },


  vendorTitle: {
    margin: "5px 0 2px 0",
  },
  highlghts: {
    color: "#011627",
    margin: "0.5em 0",
    fontWeight: "bold",
  },
  cardActions: {

  display: 'block'
  
  }
}));
/**
 * Used to display a food item
 * @component
 */
function Food({ food, shoppingCartItems }) {
  const classes = useStyles();


  /**
   * Utitlity function that is used to count how many of an item there is
   * in the shopping cart
   * @param {string} id
   */
  function cf(id) {
    let i = 0;
    for (let f of shoppingCartItems) {
      if (f.id === id) i++;
    }
    return i;
  }

  return (
    <div>
      <Card className={classes.root} elevation={0}>
        <CardMedia className={classes.media} image={food.picture} />

        <CardContent className={classes.content}>
          <Typography
            gutterBottom
       
          
          
          >
            {food.name}
          </Typography>
          <Divider />

          <Typography className={classes.vendorTitle}>
            {food.resturantName}
          </Typography>
          <div>
            <small>{`N${food.price}`} </small>
          </div>
        </CardContent>
        <CardActions className={classes.cardActions} >
        <Item food={food} count={cf} />
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
Food.propTypes = {
   /**
   * Array of all items in the shopping cart
   */
  shoppingCartItems: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * A food item
   */
  food: PropTypes.object.isRequired
}
export default connect(mapStatetoProps, null)(Food);
