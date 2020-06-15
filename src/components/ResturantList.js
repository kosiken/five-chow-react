import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Resturant from "./Resturant";

import { fetchResturants } from "../store/actions";
import api from '../api'

const useStyles = makeStyles((theme) => ({
  maindiv: {
    width: window.innerWidth > 500 ? "85%" : "100%",
    margin: "0 auto",
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
  let w = window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12;

  //
  let r = props.resturants;

  let [resturants, setResturantsState] = useState(r);
  let [width, setWidth] = useState((window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12))
  let [isLoading, setLoading] = useState(!props.resturants.length)
    function resizede() {
      let nw = window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12;
      if ( width !== nw)
        setWidth(nw,
        );
    }
 window.addEventListener("resize", resizede);
  useEffect(() => {
    console.log(resturants, "ll");
    if (props.resturants.length == 0) {
      api.vendorsList().then((resturants)=> {
      
      props.fetchResturants(resturants);
      
      
      }).catch(console.log) ;
     
    }
       if(props.resturants.length !== resturants.length){
      setResturantsState(
        props.resturants
      )
      
   setLoading(false)
    }
    
    
     return ()=> {
    window.removeEventListener("resize", resizede)
    
    }
    
    
    
    
  }  ,
  [props.resturants, resturants.length]);
  //s



  return (
    <div
      style={{
        width: window.innerWidth > 500 ? "85%" : "100%",
        margin: "0 auto",
      }}
    >
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
