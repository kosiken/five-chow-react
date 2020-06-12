import React, { useState } from "react";
import { connect } from "react-redux";

// material ui

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon  from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import  ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import  IconButton from "@material-ui/core/IconButton";

// icons
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { removeItemfromCart } from "../store/actions";
import { getTotal, removeDuplicates } from "../constants";


// Component holds all the items in the shopping cart
function CartItems(props) {
  let { shoppingCartItems, removeItemfromCart } = props;
 
  // eslint-disable-next-line no-unused-vars
  let [_, setItems] = useState(props.shoppingCartItems.length);

  function cf(id) {
    let i = 0;
    for (let f of shoppingCartItems) {
      if (f.id === id) i++;
    }
    return i;
  }

  return (
    <div>
      <List>
        {removeDuplicates(props.shoppingCartItems).map((food, i) => {
          return (
            <div key={food.id + i}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={food.picture} />
                </ListItemAvatar>
                <ListItemText
                  primary={food.name}
                  secondary={`N${food.price}`}
                />

                <ListItemIcon>
                  <IconButton
                    onClick={() => {
                      removeItemfromCart(food);
                      setItems(props.shoppingCartItems.length);
                    }}
                  >
                    <RemoveCircleIcon color="error" />
                    <Badge
                      badgeContent={cf(food.id).toString()}
                      color="secondary"
                    />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            </div>
          );
        })}
      </List>
      <Typography>Total N{getTotal(shoppingCartItems)}</Typography>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};
export default connect(mapStatetoProps, { removeItemfromCart })(CartItems);
