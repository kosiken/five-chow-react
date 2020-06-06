import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from "../types";
import { Food } from "../../constants";

let initialState = {
  shoppingCartItems: [],
};



export default (state = initialState, action) => {
  let { item } = action;
  if (!item) {
    console.warn("action.item is empty");
    return;
  }
  let mstate = state;
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const nFood = new Food(item.name, item.id, item.resturant_id);

      mstate.shoppingCartItems.unshift(nFood);
      break;

    case REMOVE_ITEM_FROM_CART:
      mstate.shoppingCartItems = mstate.shoppingCartItems.filter(
        (food) => food.id !== item.id
      );
      console.log("food " + food.toString() + " removed");
      break;
    default:
      console.warn("Unknown action " + action.type);
      break;
  }

  return mstate;
};
