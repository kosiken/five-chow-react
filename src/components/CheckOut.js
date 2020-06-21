import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";


import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from "@material-ui/core/Paper";
import api from "../api";
import { clearCart } from "../store/actions";
//  eslint-disable-next-line no-unused-vars
// import { getTotal, Food, User } from "../constants";

import paystack_logo from "../assets/paystack.svg";

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
      position: 'relative'


    },
    form: { width: '100%' },
    containerDiv: {
      padding: "1em",
      border: ".5px solid currentColor",
      borderRadius: "5px",
      position: "relative",
      marginTop: "1.5em",
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
      color: "white", margin: '1em auto',

    },
    btnSubmit: {
      margin: "1.5em auto 0",
      width: window.innerWidth > 500 ? "80%" : "100%",
    },
    link: {
      textDecoration: "none",
    },
    input: {
      width: "100%",
      marginBottom: window.innerWidth > 500 ? "0" : "1em",
    },
    inputDiv: {
      display: window.innerWidth > 500 ? "grid" : "block",
      marginBottom: "1em",

      gridTemplateColumns: "46% 46%",
      gridColumnGap: "5%",
    },

    labeling: {
      background: "white",
      position: "absolute",
      top: "-10px",
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
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = React.useState("Processing Payment");
  const [open, setOpen] = React.useState(false);
  const [redirectTo, setRedirectTo] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  // let [total] = React.useState(getTotal(props.shoppingCartItems));
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (m) => {
    setLoading(false);
    setMessage(m);
    setOpen(true);
  };

  function paystackPay(total) {
    return new Promise((res) => {
      console.log(total)
      const config = {

        key: 'pk_test_8375cb0559631010056db94e05b725e445435002', // Replace with your public key

        email: props.user.email,

        amount: total * 100,


        currency: "NGN", //GHS for Ghana Cedis

        //use your reference or leave empty to have a reference generated for you

        // label: "Optional string that replaces customer email"

        onClose: function () {

          console.log('Window closed.');

        },

        callback: function (response) {

          handleOpen('Payment complete! Thanks for your patronage');
          res(response.reference)


        }

      };
      const paystackPopup = window.PaystackPop.setup(config);
      paystackPopup.openIframe();
    })
  }

  /**
   * Temporary function to create an order object
   */
  async function makeOrder(s) {
    setLoading(true);
    let cartMap = Object.create(null);
    let total = 0
    for (let item of props.shoppingCartItems) {
      total += Math.round(parseInt(item.price));
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
        street: s.street,
        city: s.city,
        zip_code: s.zip_code,
      },
      delivery_phone_number: s.delivery_phone_number,
      payment_method: s.payment_method,
      order_items: orders.map((o) => {
        return {
          food_id: o.id,
          quantity: o.count,
        };
      }),
    };
    try {
    let paystackResponsse = await paystackPay(total)
    let apiResponse = await api.createOrder(props.token, orderObject)
    console.log(apiResponse, paystackResponsse)
    props.clearCart();
    setRedirectTo(`/orders/${apiResponse.id}`);
    }
    catch(err) {
      handleOpen('There was an error. You may have some script blocking browser extensions or it may be from us');
    }
  }

  if (!props.isAuthorized) {
    return <Redirect to={"/login?redirectTo=checkout"} />;
  }

  if (redirectTo.length) {
    return <Redirect to={redirectTo} />

  }

  return (
    <div className={classes.div}>
      <Paper className={classes.root}>
        {isLoading && (<LinearProgress color="secondary" style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%'
        }} />)};
      <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(makeOrder)}
        >
          <div className={classes.containerDiv}>
            <label className={classes.labeling}>Location information</label>
            <div className={classes.inputDiv}>
              <TextField
                color="secondary"
                label="Street *"
                name={"street"}
                variant="outlined"
                multiline
                className={classes.input}
                inputProps={{
                  ref: register({
                    required: {
                      value: true,
                      message: "You have to enter a street for delivering",
                    },
                  }),
                }}
                error={!!errors.street}
                helperText={errors.street?.message}
              />
              <TextField
                color="secondary"
                label="ZipCode*"
                className={classes.input}
                name={"zip_code"}
                variant="outlined"
                multiline
                inputProps={{
                  ref: register({
                    required: {
                      value: true,
                      message: "You have to enter a zip code for delivering",
                    },
                  }),
                }}
                error={!!errors.zip_code}
                helperText={errors.zip_code?.message}
              />
            </div>
            <div className={classes.inputDiv}>
              <TextField
                color="secondary"
                label="City"
                className={classes.input}
                name={"city"}
                variant="outlined"
                inputProps={{
                  ref: register({
                    required: {
                      value: true,
                      message: "You have to enter your city",
                    },
                  }),
                }}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
              <Select
                native
                defaultValue={0}
                inputProps={{
                  name: "address_type",
                  id: "address_type",
                  ref: register(),
                }}
              >
                <option value={0}>Home Address</option>
                <option value={1}>Office Address</option>
              </Select>
            </div>
          </div>

          <div className={classes.containerDiv}> <div className={classes.inputDiv}>
            <label className={classes.labeling}>Payment Information</label>
            <TextField
              color="secondary"
              label="Delivery Phone number *"
              name={"delivery_phone_number"}
              variant="outlined"
              multiline
              className={classes.input}
              inputProps={{
                ref: register({
                  required: {
                    value: true,
                    message: "You have to enter a delivery phone number",
                  },
                }),
              }}
              error={!!errors.delivery_phone_number}
              helperText={errors.delivery_phone_number?.message}
            />
            <Select
              native
              defaultValue={0}
              inputProps={{
                name: "payment_method",
                id: "payment_method",
                ref: register(),
              }}
            >
              <option value={0}>Debit Card</option>
              <option value={1}>On Delivery</option>
            </Select>
          </div>
          </div>
          <div>
            <Button
              type="submit"
              className={classes.btn}
              variant="contained"
              color="info"
              disabled={isLoading}

            >
              <Avatar src={paystack_logo} className={classes.small} />
        Pay with Paystack
      </Button>
          </div>
        </form>
      </Paper>

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

CheckOut.propTypes = {
  /**
   * This value shows whether the user is already logged in, in that case
   * we need to redirect the user away from this page
   */
  isAuthorized: PropTypes.bool.isRequired,
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
    isAuthorized: state.auth.isAuthorized,
  };
};
export default connect(mapStatetoProps, { clearCart })(CheckOut);
