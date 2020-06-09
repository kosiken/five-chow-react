import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import Food from "./Food"
import { fetchFoods } from "../store/actions";
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
function FoodList(props) {
  let [mfoods, setFoods] = useState(props.foods);

 let w = window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12;
  let [width, setWidth] = useState(w);
  useEffect(() => {
    window.addEventListener("resize", function () {
      let nw = window.innerWidth > 600 ? 4 : window.innerWidth > 400 ? 6 : 12;
      if (width !== nw) setWidth(nw);
    });
  });

  function cf(id) {
    let i = 0;
    for (let f of props.shoppingCartItems) {
      if (f.id === id) i++;
    }
    return i;
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
        {mfoods.map((food, i) => (
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
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};

export default connect(mapStatetoProps, { fetchFoods })(FoodList);
