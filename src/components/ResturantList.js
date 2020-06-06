import React,{useState, useEffect} from 'react'

import Grid from "@material-ui/core/Grid"


import Resturant from "./Resturant"
import hamburger from "../assets/hamburger.jpg"
import bread from "../assets/bread.jpg"
import meat from "../assets/meat.jpg"

import Cart from "./Cart"
const cards =  [
    { title: 'Resturant One', src: hamburger, flex: 12 },
    { title: 'Resturant two', src: bread, flex: 6 },
    { title: 'Resturant three', src: meat, flex: 6 },
  
  ]


function ResturantList() {

    return (
        <div>
            <Grid style={{
                margin:'0 auto'
            }} container  direction="row"
  justify="center"
  alignItems="center"  xs={12} spacing={3} >
                {cards.map((i)=> (
                   <Grid item xs={4}>
                       <Resturant resturant={i}/>


                   </Grid>
                ))}
            </Grid>

       <Cart />
        </div>

        
    )
}

export default ResturantList
