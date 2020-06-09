import React, {useState, useEffect} from 'react'

import {Avatar, ListItem,ListItemAvatar, Divider,ListItemText , ListItemIcon, Badge, IconButton}from "@material-ui/core";

import {  addItemToCart, removeItemfromCart} from "../store/actions";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { connect } from "react-redux";



function Item({food, count,  addItemToCart, removeItemfromCart}) {

let [mcount, setCount] = useState(count(food.id))

    return (
        <div>
                      <ListItem >
        <ListItemAvatar>
          <Avatar src={food.picture} />
        </ListItemAvatar>
        <ListItemText primary={food.name} secondary={`N${food.price}`} />
        
           <ListItemIcon>
     <IconButton onClick={()=> {
      
       
         removeItemfromCart(food)
         setCount(count(food.id))
     }} >
    
       <RemoveCircleIcon/>
      
       </IconButton>
       
     </ListItemIcon>
         <Badge badgeContent={mcount.toString()} color="secondary"/> 
     <ListItemIcon>
     <IconButton onClick={()=> {
      
       
         addItemToCart(food)
         setCount(count(food.id))
     }} >
    
       <AddCircleIcon/>
    
       </IconButton>
     </ListItemIcon>
   
      </ListItem>
       <Divider />
        </div>
    )
}
export default connect(()=> {return {}}, { addItemToCart , removeItemfromCart})(Item)
