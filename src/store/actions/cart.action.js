import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART} from '../types'

export const addItemToCart = item => dispatch => {
console.log(item)
    dispatch({
      type: ADD_ITEM_TO_CART,
  
      item
    });
  };

  export const removeItemfromCart = item => dispatch => {
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
  
      item
    });
  };


  export const clearCart = () => dispatch => {
    dispatch({
      type: CLEAR_CART
    });
  };
