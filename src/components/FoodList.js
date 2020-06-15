import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import Food from "./Food";
import { fetchFoods } from "../store/actions";
import Loader from './Loader';
import api from '../api'

function tempAsyncFunction(duration, shouldFail = false) {
  return new Promise((resolve,reject)=> {
    setTimeout(function(){
 
      if(shouldFail){ reject("There was ab error");}
      else{ resolve('ok') ;    }
    },duration)
  })
}
function FoodList(props) {
  let [mfoods, setFoods] = useState(props.foods);
  let [width, setWidth] = useState((window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12))
  let [isLoading, setLoading] = useState(!props.foods.length)
  function resized() {
      let nw = window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12;
      if ( width !== nw)
        setWidth(nw,
        );
    }
 window.addEventListener("resize", resized);



  useEffect(()=> {
  
  if(mfoods.length == 0){ 
  
  
  if(props.debug){
   tempAsyncFunction(3000).then(val=> {
    console.log('here2')
      props.fetchFoods()
    }).catch(console.log)
    }
    
    else {
      api.foodItemsList().then((s)=> {console.log(s);
      props.fetchFoods(props.debug, s)}).catch(console.log)

}

}
    if(props.foods.length !== mfoods.length){
      setFoods(
        props.foods
      )
      
   setLoading(false)
    }
    return ()=> {
    window.removeEventListener("resize", resized)
    
    }
  }, [props.foods, mfoods.length])

  if(isLoading) {
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
        {mfoods.map((food) => (
          <Grid item xs={width} key={`food_${food.id}`}>
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
debug: state.auth.debug
  };
};

export default connect(mapStatetoProps, { fetchFoods })(FoodList);
