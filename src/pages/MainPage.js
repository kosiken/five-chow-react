import React, { useState} from "react";

import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

// import Footer from "../components/Footer";

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
import Order from "../components/Order";
import OrderList from "../components/OrderList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height:'100vh',
    width:'100vw',
    position:'relative'
   
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
  // eslint-disable-next-line no-unused-vars
  const [loadedPaystack, setLoaded] =useState(false)



  return (
    <Router>
      <div className={classes.root}>
        <TopBar />

          <Switch>
            <Route exact path="/">

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
            <Route exact path="/orders/:id">
              <Order />
            </Route>

            <Route exact path="/orderlist">
              <OrderList />
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
    </Router>
  );
}

export default MainPage;
