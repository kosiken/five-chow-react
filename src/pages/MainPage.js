import React from "react";
import { Provider } from "react-redux";
import { Link } from "react-router-dom";

import store from "../store";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// import AccountCircle from "@material-ui/icons/AccountCircle";

import ResturantList from "../components/ResturantList";

import TopBar from "../components/TopBar.js";
import FoodList from "../components/FoodList";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Cart from "../components/Cart";

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
      <div className={classes.root}>
        <TopBar />
        <Fab
          className={classes.fab}
          variant={state.variant}
          color="secondary"
          onClick={() => {
            setModal(true);
          }}
        >
          <ShoppingCart />
          {state.variant === "extended" ? "Shopping Cart" : ""}
        </Fab>
        <div className={classes.root}>
          <Router>
            <Switch>
              <Route exact path="/">
                <FoodList />
              </Route>
              <Route path="/cart">
                <Cart />
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
          </Router>
        </div>
      </div>
    </Provider>
  );
}

export default MainPage;
