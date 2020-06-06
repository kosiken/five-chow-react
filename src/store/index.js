import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import Auth from './reducers/user.reducer';
import Food from './reducers/food.reducer';
import ShoppingCart from './reducers/cart.reducer';
const InitialState = {};
const RootReducer = combineReducers({
    auth: Auth,
    food: Food,
    cart: ShoppingCart
})

const middleware = [thunk];
export default createStore(
    RootReducer,
    InitialState,
    applyMiddleware(...middleware),
  );