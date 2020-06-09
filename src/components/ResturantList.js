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
  let r = props.resturants;
  
  
 
let [resturants, setResturantsState]=useState(r);

   useEffect(() => {
  
    console.log(resturants,'ll');
       if(resturants.length ==0 ){
       
       props.fetchResturants([]);
       setResturantsState(props.resturants)
       };
   }, [props.resturants])
//s 
  let [width, setWidth] = useState(w);
  useEffect(() => {

     window.addEventListener("resize", function () {
    let nw = window.innerWidth > 600 ? 4 : window.innerWidth > 400? 6: 12;
   if(width!==nw) setWidth(nw);
  });
  });
 

  
  return (

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

     
    </div>
    
   
  );
}

const mapStatetoProps = (state) => {
  return {
    resturants: state.food.resturants,
  };
};

export default connect(mapStatetoProps, { fetchResturants })(ResturantList);
