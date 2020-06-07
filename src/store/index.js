import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import Auth from './reducers/user.reducer';
import Food from './reducers/food.reducer';
import ShoppingCart from './reducers/cart.reducer';
import { persistStore, autoRehydrate } from "redux-persist";
const InitialState = {auth: {
 auth: {},
  isAuthorized: false,
  },
  
  cart: {
   shoppingCartItems: []
  },
  
  food: {
    resturants: []
}

};
const RootReducer = combineReducers({
    auth: Auth,
    food: Food,
    cart: ShoppingCart
})
const createMStore = applyMiddleware(thunk)(
  createStore
);
 const store = createMStore(RootReducer);
export default store
