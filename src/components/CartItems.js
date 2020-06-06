import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {ListItemAvatar,ListItemText , ListItemIcon, List, ListItem, Typography,
IconButton,Avatar
}from '@material-ui/core';
import hamburger from "../assets/hamburger.jpg"
import bread from "../assets/bread.jpg"
import meat from "../assets/meat.jpg"
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


let foodlists = [


{

name: "hamburger",
price:100,
src: hamburger,count: 0

},
{

  name: "bread",
  price:100,
  src: bread,count: 0
  
  },
  {

    name: "meat",
    price:100,
    src: meat, count:0
    
    }]
    

export default function CartItems() {

return (


 <List>

          {foodlists.map((food)=> {
          return ( <div key={food.title} > 
          
          
                            <ListItem >
        <ListItemAvatar>
          <Avatar src={food.src} />
        </ListItemAvatar>
        <ListItemText primary={food.name} secondary={`N${food.price}`} />
  
   <ListItemIcon>
     <IconButton onClick={()=> {
      
       
       
     }} >
     
       <RemoveCircleIcon color="error"/>
     
       </IconButton>
     </ListItemIcon>
      </ListItem>
          
          
          </div>)
          })}
      
        </List>
)


}
