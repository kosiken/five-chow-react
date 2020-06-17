import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
// material ui
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";

// icons
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CloseIcon from "@material-ui/icons/Close";

//actions
import { removeItemfromCart, clearCart } from "../store/actions";

// utils
import { getTotal, removeDuplicates } from "../constants";

// eslint-disable-next-line no-unused-vars
import { Food } from "../constants";

/**
 * This component holds all the items in a users shopping cart
 * @param {{removeItemfromCart: function,
 * shoppingCartItems: Array<Food>
 * }} props
 */
function CartItems(props) {
  let { shoppingCartItems, removeItemfromCart } = props;

  // eslint-disable-next-line no-unused-vars
  let [_, setItems] = useState(props.shoppingCartItems.length);
  const [message, setMessage] = useState("Cart was cleared");
  const [open, setOpen] = useState(false);

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

  function clear() {
    if (!props.shoppingCartItems.length) {
      setOpen(true);
      setMessage("Nothing is in your cart");
      return;
    }

    if (!window.confirm("Are you sure you want to clear cart")) {
      return;
    }
    props.clearCart();
    setItems(props.shoppingCartItems.length);
    setMessage("Cart was cleared");
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div>
      <List
        style={{
          width: window.innerWidth > 500 ? "85%" : "90%",
          margin: "0 auto",
        }}
      >
        {removeDuplicates(props.shoppingCartItems).map((food, i) => {
          return (
            <div key={food.id + i}>
              <ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={food.picture} variant="square" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={food.name + " x" + cf(food.id).toString()}
                    secondary={`N${food.price}`}
                  />
                </ListItem>
                <ListItemIcon>
                  <IconButton
                    onClick={() => {
                      removeItemfromCart(food);
                      setItems(props.shoppingCartItems.length);
                    }}
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </ListItemIcon>
              </ListItem>

              <Divider />
            </div>
          );
        })}
      </List>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          bottom: "0",
          left: "0",
          padding: "15px",
          display: "flex",
          borderTop: ".5px solid black",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography>Total N{getTotal(shoppingCartItems)}</Typography>
        <Button color="primary" onClick={clear}>
          {" "}
          Clear Cart
        </Button>
        <Link to="/checkout">
          {" "}
          <Button variant="contained" color="primary">
            {" "}
            Continue
          </Button>{" "}
        </Link>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};
export default connect(mapStatetoProps, { removeItemfromCart, clearCart })(
  CartItems
);
