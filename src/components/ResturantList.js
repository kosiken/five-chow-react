import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import Fab from "@material-ui/core/Fab"

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
const restutants = [];
const useStyles = makeStyles((theme)=> ({
    gridl: {
        margin: "0 auto"
    },
      fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}) )
for(let i = 0; i< 15; i++){
    restutants.push({
        name:'Resturant ' + i,
        picture: cards[i%3].src
    })
}
function ResturantList() {
    const classes = useStyles();
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
