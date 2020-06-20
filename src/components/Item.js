import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";


import { makeStyles } from "@material-ui/core/styles";
import { addItemToCart, removeItemfromCart } from "../store/actions";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const useStyles = makeStyles({

  cartActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
  width: '100%'
  }
});

/**
 * This is what is displayed in the modal that opens when a user wants to
 * select a food
 * @component
 */
function Item(props) {
  const { food, count, addItemToCart, removeItemfromCart } = props;
  const classes = useStyles();
  let [mcount, setCount] = useState(count(food.id));

  function addToCart() {
    addItemToCart(food);
    setCount(count(food.id));
  }
function removeFromCart() {
  removeItemfromCart(food);
  setCount(count(food.id));
}
  if (mcount < 1) {
    return (<Button className={classes.btn} color="secondary" variant="contained" onClick={addToCart}>Add To Cart</Button> );
  }

  return (

      <div className={classes.cartActions}>
        <section>
          <IconButton
            onClick={removeFromCart}
          >
            <RemoveCircleIcon />
          </IconButton>

          <Badge badgeContent={mcount.toString()} color="secondary" />

          <IconButton
            onClick={addToCart}
          >
            <AddCircleIcon />
          </IconButton>
        </section>
      </div>

  );
}

Item.propTypes = {
  /**
   * Utitlity function that is used to count how many of an item there is
   * in the shopping cart
   */
  count: PropTypes.func.isRequired,

  /**
   * A food item
   */
  food: PropTypes.object.isRequired,

  /**
   * Action to add an item from the cart
   */
  addItemToCart: PropTypes.func.isRequired,

  /**
   * Action to remove an item from the cart
   */
  removeItemfromCart: PropTypes.func.isRequired,
};

export default connect(
  () => {
    return {};
  },
  { addItemToCart, removeItemfromCart }
)(Item);
