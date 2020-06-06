import React, {useState, useEffect} from 'react'

import {Avatar, ListItem,ListItemAvatar, Divider,ListItemText , ListItemIcon, Badge, IconButton}from "@material-ui/core";


import AddCircleIcon from '@material-ui/icons/AddCircle';





function Item({food}) {

    const [count, setFood] = useState(food.count)
    useEffect(()=> {
        console.log("incremented")
    })
    return (
        <div>
                      <ListItem >
        <ListItemAvatar>
          <Avatar src={food.src} />
        </ListItemAvatar>
        <ListItemText primary={food.name} secondary={`N${food.price}`} />
     <ListItemIcon>
     <IconButton onClick={()=> {
      
       
        setFood(count+1)
     }} >
     <Badge badgeContent={count.toString()} color="secondary">
       <AddCircleIcon/>
       </Badge>
       </IconButton>
     </ListItemIcon>
    
      </ListItem>
       <Divider />
        </div>
    )
}

export default Item
