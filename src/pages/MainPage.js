import React,{useState, useEffect}  from "react";
import { Provider } from "react-redux";
import { Link, BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import store from "../store";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// import AccountCircle from "@material-ui/icons/AccountCircle";

import ResturantList from "../components/ResturantList";

import TopBar from "../components/TopBar.js";
import FoodList from "../components/FoodList";

import Item from "../components/Item";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import CartItems from "../components/CartItems";
import CheckOut from "../components/CheckOut";
import ComboBox from "../components/ComboBox";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f6f6ff",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function MainPage() {
  const classes = useStyles();

  const [state, setState] = useState({
    variant: window.innerWidth > 500 ? "extended" : "round",
  });
  window.addEventListener("resize", function () {
    let v = window.innerWidth > 500 ? "extended" : "round";

    if (v != state.variant) setState({ ...state, variant: v });
  });

  return (
    <Provider store={store}>
       <Router>
      <div className={classes.root}>
        <TopBar />
        <Link to="/cart">
        <Fab
          className={classes.fab}
          variant={state.variant}
          color="primary"
>
          <ShoppingCart/>
          {state.variant === "extended" ? "Shopping Cart" : ""}
        </Fab>
        </Link>
        <div className={classes.root}>
       
            <Switch>
              <Route exact path="/">
               <ComboBox  />
                <FoodList />
              </Route>
              <Route path="/cart">
                <CartItems />
              </Route>
              
          
              <Route path="/resturants">
                <ResturantList />
              </Route>
              <Route path="/checkout">
                <CheckOut amount={1000} />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/signup">
                <SignUp />
              </Route>
            </Switch>
         
        </div>
      </div>
       </Router>
    </Provider>
  );
}

export default MainPage;
