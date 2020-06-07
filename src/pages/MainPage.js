import React from "react";
import {Provider} from 'react-redux';


import store from "../store"
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";


// import AccountCircle from "@material-ui/icons/AccountCircle";

import ResturantList from "../components/ResturantList"
import TopBar from "../components/TopBar.js"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f6f6ff"
  },

}));

function MainPage() {


  const classes = useStyles();
  return (
    <Provider store={store}>
    <div className={classes.root}>
      <TopBar/>

      <div className={classes.root}>
      <ResturantList />
      </div>
      
    </div>
    </Provider>
  );
}

export default MainPage;
