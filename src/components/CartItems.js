import React, { useState } from "react";
import PropTypes from "prop-types";
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
import DeleteIcon from '@material-ui/icons/Delete';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
//actions
import { removeItemfromCart, clearCart } from "../store/actions";

// utils
import { getTotal, removeDuplicates } from "../constants";

// hooks
import useWidth from "../hooks/useWidth";

/**
 *
 * This component holds all the items in a users shopping cart
 * @component
 *
 */
function CartItems(props) {
  let { shoppingCartItems, removeItemfromCart } = props;

  // eslint-disable-next-line no-unused-vars
  let [_, setItems] = useState(props.shoppingCartItems.length);
  const [message, setMessage] = useState("Cart was cleared");
  const [open, setOpen] = useState(false);
  const width = useWidth('100%', '85%');

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

  if (!props.shoppingCartItems.length) {

    return (
      <div style={{

        minHeight: '100vh',
        
        top: 0,
        
        display: 'flex',
        flexDirection:'column',
        width: '100vw',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
      }}>
      <ViewAgendaIcon style={{ fontSize: 40 }}  />
        <Typography> There is nothing here, <Link to="/"> Go Home </Link> </Typography>

      </div>
    )
  }

  return (
    <div  style={{

     
        
        
        
      
        width: '100vw',
        overflowX: 'hidden',
        position:'relative',
      }}>
      <div style={{
      height: '100%',
        minHeight: '100vh',
      
      }}>
    
         <div
        style={{
          overflowX:'hidden',
          width: "100vw",
          top: "0",
          left: "0",
          padding: "10px 5px",
        backgroundColor:'#ffdc4a',
          borderTop: ".5px solid black",
    position: 'sticky',
      zIndex: 999   
        }}
      >
        <div style={{
            padding: "5px",   display: "flex",
 alignItems: "center",
 justifyContent: "space-around",
 

        }}>
        <Typography>Total N{getTotal(shoppingCartItems)}</Typography>
      

        <Link to="/checkout">
          {" "}
          <Button variant="contained" color="primary">
            {" "}
            Continue
          </Button>

        </Link>
        </div>
      </div>
<List
        style={{
          width,
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
                    <div style={{textAlign:'center'}} >
        <IconButton color="primary" onClick={clear} aria-label="clear cart" >
          <DeleteIcon />
        </IconButton>
      
  
        </div>
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

CartItems.propTypes = {
  /**
   * Action to remove an item from the cart
   */
  removeItemfromCart: PropTypes.func.isRequired,

  /**
   * Array of all items in the shopping cart
   */
  shoppingCartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStatetoProps = (state) => {
  return {
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};
export default connect(mapStatetoProps, { removeItemfromCart, clearCart })(
  CartItems
);
