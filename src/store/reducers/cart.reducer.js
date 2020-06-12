import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from "../types";


let initialState = {
  shoppingCartItems: [],
};


// This reducer is for the items in the shopping cart

export default (state = initialState, action) => {

  let { item } = action;
  if (!item) {
    console.warn("action.item is empty");
 
  }
  let mstate = state;
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      

      mstate.shoppingCartItems.unshift(item);
      break;

    case REMOVE_ITEM_FROM_CART:
      let index = mstate.shoppingCartItems.findIndex(
        (food) => food.id === item.id
      );
      console.log("food " + item.toString() + " removed");
      
      mstate.shoppingCartItems.splice(index, 1)
      break;
    case CLEAR_CART:
      mstate = {shoppingCartItems: []};
      break
    default:
      console.warn("Unknown action " + action.type);
      break;
  }

  return mstate;
};
