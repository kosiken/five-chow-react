import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core"
import Resturant from "./Resturant"
const cards =  [
    { title: 'Resturant One', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
    { title: 'Resturant two', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
    { title: 'Resturant three', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      { title: 'Resturant three', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
  ]
const restutants = [];

for(let i = 0; i< 15; i++){
    restutants.push({
        name:'Resturant ' + i,
        picture: cards[i%3].src
    })
}
function ResturantList() {

    return (
        <div>
            <Grid container xs={12} spacing={3} >
                {cards.map((i)=> (
                   <Grid item xs={4}>
                       <Resturant resturant={i}/>


                   </Grid>
                ))}
            </Grid>
        </div>

        
    )
}

export default ResturantList
