import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {BrowserRouter as Router,Switch,Route
 } from 'react-router-dom'
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Resturant from "./Resturant";
import hamburger from "../assets/hamburger.jpg";
import bread from "../assets/bread.jpg";
import meat from "../assets/meat.jpg";
import FoodList from './FoodList'
import Cart from "./Cart";
import { fetchResturants } from "../store/actions";
const cards = [
  { title: "Resturant One", src: hamburger, flex: 12 },
  { title: "Resturant two", src: bread, flex: 6 },
  { title: "Resturant three", src: meat, flex: 6 },
];
const useStyles = makeStyles((theme) => ({
maindiv:{
width: window.innerWidth>500 ? '85%': '100%',
margin:'0 auto'

},

  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ResturantList(props) {
  let w = window.innerWidth > 600 ? 4 : window.innerWidth > 400? 6: 12;

  //
  let r = props.resturants
  
  const classes = useStyles();
let [resturants, setResturantsState]=useState(r);

   useEffect(() => {
    console.log(resturants,'ll');
       setResturantsState(props.resturants);
   }, [props.resturants])
props.fetchResturants([]);
  let [width, setWidth] = useState(w);
  useEffect(() => {

    console.log("resized");
  });
  window.addEventListener("resize", function () {
    let nw = window.innerWidth > 600 ? 4 : window.innerWidth > 400? 6: 12;
    setWidth(nw);
  });

  
  return (
  <Router>
   <Switch>
    <div style={{
    width: window.innerWidth>500 ? '85%': '100%',
margin:'0 auto'}} >
      <Grid
        style={{
          margin: "0 auto",
        }}
        container
        item
        justify="center"
        alignItems="center"
        xs={12}
        spacing={3}
      >
      
        {resturants.map((resturant, i) => (
          <Grid item xs={width} key={`resturant_${resturant.id}`}>
            <Resturant resturant={resturant} />
          </Grid>
        ))}
      </Grid>
<Cart/>
     
    </div>
    
    </Switch>
    </Router>
  );
}

const mapStatetoProps = (state) => {
  return {
    resturants: state.food.resturants,
  };
};

export default connect(mapStatetoProps, { fetchResturants })(ResturantList);
