import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from "../types";
import { Food } from "../../constants";

let initialState = {
  shoppingCartItems: [],
};

//var array = [2, 5, 9];
//console.log(array)
//var index = array.indexOf(5);
//if (index > -1) {
//  array.splice(index, 1);
//}
// array = [2, 9]
//console.log(array);

export default (state = initialState, action) => {

  let { item } = action;
  if (!item) {
    console.warn("action.item is empty");
    return initialState;
  }
  let mstate = state;
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      

      mstate.shoppingCartItems.unshift(item);
      break;

    case REMOVE_ITEM_FROM_CART:
      let index = mstate.shoppingCartItems.findIndex(
        (food) => food.id == item.id
      );
      console.log("food " + item.toString() + " removed");
      
      mstate.shoppingCartItems.splice(index, 1)
      break;
    default:
      console.warn("Unknown action " + action.type);
      break;
  }

  return mstate;
};
