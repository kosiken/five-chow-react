import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { addItemToCart, removeItemfromCart } from "../store/actions";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const useStyles = makeStyles({
  foodInfo: {
    display: "flex",
    padding: "8px",
  },

  sectionInfo: {
    padding: "0px 5px",
  },

  foodTitle: {
    fontWeight: "bold",
  },
  foodImg: {
    width: "100px",
    minWidth: "80px",
  },
  cartActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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

  return (
    <div>
      <div className={classes.foodInfo}>
        <img src={food.picture} alt={food.name} className={classes.foodImg} />
        <section className={classes.sectionInfo}>
          <Typography className={classes.foodTitle}> {food.name} </Typography>
          <small>{`N${food.price}`} </small>
        </section>
      </div>

      {/* add to cart buttons */}
      <div className={classes.cartActions}>
        <section>
          <IconButton
            onClick={() => {
              removeItemfromCart(food);
              setCount(count(food.id));
            }}
          >
            <RemoveCircleIcon />
          </IconButton>

          <Badge badgeContent={mcount.toString()} color="secondary" />

          <IconButton
            onClick={() => {
              addItemToCart(food);
              setCount(count(food.id));
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </section>
      </div>

      <Divider />
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
