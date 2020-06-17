import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
// import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";

import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
// import api from "../api";
// eslint-disable-next-line no-unused-vars
import { getTotal, Food, User } from "../constants";

import paystack_logo from "../assets/paystack.svg";

const useStyles = makeStyles((theme) => {
  return {
    mainDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      position: "fixed",
      top: "0",
      background: "linear-gradient(45deg,#f0324b, #e5298b, #b44dc3)",
      left: "0",
    },
    root: {
      border: "none",
      padding: theme.spacing(5),
      textAlign: "center",
    },
    checkout: {
      fontStyle: "italic",
      color: "grey",
    },
    small: {
      backgroundColor: "white",
      borderRaduis: "50%",
      padding: theme.spacing(1),
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
    btn: {
      backgroundColor: "rgb(11, 164, 219)",
      color: "white",
    },
    link: {
      textDecoration: "none",
    },
  };
});

/**
 * This component is what is displayed at the checkout route
 * it is used to trigger api post requests for orders
 * @component
 */
function CheckOut(props) {
  
  const classes = useStyles();

  let [total] = React.useState(getTotal(props.shoppingCartItems));

  function renderButton(tots) {

    // we need to check if the user is signed in, if he is then he can make an order
    // otherwise we need to redirect him to the login page to sign in
    if (props.token) {
      return (
        <Button
          onClick={makeOrder}
          className={classes.btn}
          variant="contained"
          color="info"
          disabled={tots === 0}
        >
          <Avatar src={paystack_logo} className={classes.small} />
          Pay with Paystack
        </Button>
      );
    }
    return (
      <Link to="/login?returnTo=checkout">
        {" "}
        <Button variant="contained" color="primary">
          Login to order
        </Button>
      </Link>
    );
  }

  /**
   * Temporary function to create an order object
   */
  function makeOrder() {
    let cartMap = Object.create(null);
    for (let item of props.shoppingCartItems) {
      if (!cartMap[item.id]) {
        cartMap[item.id] = item;
        cartMap[item.id].count = 1;
      } else {
        cartMap[item.id].count += 1;
      }
    }
    let orders = Object.values(cartMap);
    let orderObject = {
      user: props.user.id,
      delivery_address: {
        user: props.user.id,
        address_type: "HOME",
        street: "place Street",
        city: "Enugu",
        zip_code: "042",
        number: "8082107825",
      },
      delivery_phone_number: "8082107825",
      payment_method: "card",
      order_items: orders.map((o) => {
        return {
          food_id: o.id,
          quantity: o.count,
        };
      }),
    };
    console.log(orderObject);
  }

  return (
    <div className={classes.mainDiv}>
      <Card className={classes.root}>
        <CardHeader title="Confirm Transaction" />

        <CardContent>
          <Typography variant="p" className={classes.checkout}>
            {total > 0
              ? ` You are about to confirm transaction of N${total}`
              : "You havent ordered anything yet"}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {renderButton(total)}
          <div>
            <Link to="/cart" className={classes.link}>
              <Button>Back</Button>
            </Link>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

CheckOut.propTypes = {
  /**
   * Array of all items in the shopping cart
   */
  shoppingCartItems: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * The api auth token
   */
  token: PropTypes.string.isRequired,

  /**
   * Check to see if we are in production
   */
  debug: PropTypes.bool.isRequired,

  /**
   * Users current location
   */
  location: PropTypes.string,

  /**
   * The current user
   */
  user: PropTypes.object,
};

const mapStatetoProps = (state) => {
  return {
    shoppingCartItems: state.cart.shoppingCartItems,
    token: state.auth.token,
    debug: state.auth.debug,
    location: state.auth.location,
    user: state.auth.user,
  };
};
export default connect(mapStatetoProps, null)(CheckOut);
