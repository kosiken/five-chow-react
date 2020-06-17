import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// import AccountCircle from "@material-ui/icons/AccountCircle";

import ResturantList from "../components/ResturantList";

import TopBar from "../components/TopBar.js";
import FoodList from "../components/FoodList";
import Button from "@material-ui/core/Button";

import Login from "../components/Login";
import SignUp from "../components/SignUp";
import CartItems from "../components/CartItems";
import CheckOut from "../components/CheckOut";
import ComboBox from "../components/ComboBox";
import NotFound from "../components/NotFound";

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
  linkdiv: {
    display: "flex",
    alignContent: "space-between",
    justifyContent: "space-around",
    flexDirection: window.innerWidth > 500 ? "row" : "column",
    alignItems: "center",
    backgroundColor: "#ffdc4a",
    padding: "15px",
    marginBottom: "10px",
  },
}));

function MainPage(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    variant: window.innerWidth > 500 ? "extended" : "round",
  });

  window.addEventListener("resize", function () {
    let viewType = window.innerWidth > 500 ? "extended" : "round";

    if (viewType !== state.variant) setState({ ...state, variant: viewType });
  });

  return (
    <Router>
      <div className={classes.root}>
        <TopBar />

        <div className={classes.root}>
          <Switch>
            <Route exact path="/">
              <Link to="/cart">
                <Fab
                  className={classes.fab}
                  variant={state.variant}
                  color="primary"
                >
                  <ShoppingCart />
                  {state.variant === "extended" ? "Shopping Cart" : ""}
                </Fab>
              </Link>

              <div className={classes.linkdiv}>
                <ComboBox />
                <Link to="/resturants">
                  <Button
                    style={{
                      color: "#011627",
                    }}
                  >
                    Resturants
                  </Button>
                </Link>
              </div>

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

            <Route path="*" exact={true} component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default MainPage;
