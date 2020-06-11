import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import Food from "./Food";
import { fetchFoods } from "../store/actions";
import Loader from './Loader';


function tempAsyncFunction(duration, shouldFail = false) {
  return new Promise((resolve,reject)=> {
    setTimeout(function(){
 
      if(shouldFail){ reject("There was ab error");}
      else{ resolve('ok') ;    console.log('here')}
    },duration)
  })
}
function FoodList(props) {
  let [state, setState] = useState({
    mfoods: props.foods,
    width: window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12,
    isLoading: props.foods.length === 0
  });

  useEffect(() => {
 
  if(state.mfoods.length == 0){  tempAsyncFunction(3000).then(val=> {
    console.log('here2')
      props.fetchFoods()
    }).catch(console.log)
    }
    window.addEventListener("resize", function () {
      let nw = window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12;
      if (state.width !== nw)
        setState({
          ...state,
          width: nw,
        });
    });
  });

  useEffect(()=> {
    if(props.foods.length !== state.mfoods.length){
      setState({
        ...state, mfoods: props.foods, isLoading: false
      })
    }
  }, [props.foods])

  if(state.isLoading) {
    return <Loader />
  }

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
        {state.mfoods.map((food) => (
          <Grid item xs={state.width} key={`food_${food.id}`}>
            <Food food={food} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    foods: state.food.foods,

  };
};

export default connect(mapStatetoProps, { fetchFoods })(FoodList);
