import React, { useState, useEffect } from "react";
import {
  useParams
} from "react-router-dom";
import { connect } from "react-redux";
import List from "@material-ui/core/List";

import Item from "./Item";
import { fetchFoods } from "../store/actions";

function FoodList (props){
 let { id } = useParams();
 
 let [mfoods, setFoods] = useState(props.foods.find(res=> res.id== id).foods);
 useEffect(
()=> {
setFoods(props.foods.find(res=> res.id== id).foods) }, [props.foods])
props.fetchFoods(id);


  function cf(id ) {
  let i=0;
  for(let f of props.shoppingCartItems){
  if(f.id=== id) i++;
  
  }
  return i
  }
return (
      <List>

          {mfoods.map((food, i)=> {
          return ( <Item key={food.id} food={food} count={cf}/>)
          })}
      
        </List>






)

}

const mapStatetoProps = (state) => {
  return {
    foods: state.food.resturants,
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};

export default connect(mapStatetoProps, { fetchFoods })(FoodList);
