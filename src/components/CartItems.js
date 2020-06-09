import React, {useState, useEffect} from 'react'
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {ListItemAvatar,ListItemText , ListItemIcon, List, ListItem, Typography,Badge,
IconButton,Avatar
}from '@material-ui/core';
import hamburger from "../assets/hamburger.jpg"
import bread from "../assets/bread.jpg"
import meat from "../assets/meat.jpg"
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { removeItemfromCart} from "../store/actions";
import {getTotal, removeDuplicates} from '../constants' 


function CartItems(props) {
let {shoppingCartItems, removeItemfromCart} = props
let hasrendered={}
let [mitems,setItems] = useState(props.shoppingCartItems.length)

  function cf(id ) {
  let i=0;
  for(let f of shoppingCartItems){
  if(f.id=== id) i++;
  
  }
  return i
  }
  
return (
<div>

 <List>

          {removeDuplicates(props.shoppingCartItems).map((food, i)=> {
          return ( <div key={food.id+i} > 
          
          
                            <ListItem >
        <ListItemAvatar>
          <Avatar src={food.picture} />
        </ListItemAvatar>
        <ListItemText primary={food.name} secondary={`N${food.price}`} />
  
   <ListItemIcon>
     <IconButton onClick={()=> {
      
        removeItemfromCart(food)
     setItems(props.shoppingCartItems.length);
        
       
     }} >
      
       <RemoveCircleIcon color="error"/>
     <Badge badgeContent={cf(food.id).toString()} color="secondary"/>
       </IconButton>
       
     </ListItemIcon>
     
      </ListItem>
          
          
          </div>)
          })}
      
        </List>
        <Typography>Total N{getTotal(shoppingCartItems)}</Typography>
        
        </div>
)


}


const mapStatetoProps = (state) => {
  return {
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};
export default connect(mapStatetoProps, {removeItemfromCart})(CartItems);
