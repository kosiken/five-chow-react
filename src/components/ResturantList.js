import React,{useState, useEffect} from 'react'

import Grid from "@material-ui/core/Grid"

import { makeStyles } from '@material-ui/core/styles';
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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function ResturantList() {
let w = window.innerWidth > 500 ? 4 : 6;

const classes = useStyles();


let [width, setWidth]=useState(w)
useEffect(()=> {
console.log("resized")
})
window.addEventListener('resize',function() {
let nw = window.innerWidth > 500 ? 4 : 6;
setWidth(nw)
}
)
    return (
        <div >
        
            <Grid style={{
                margin:'0 auto'
            }} container item 
  justify="center"
  alignItems="center"  xs={12} spacing={3} >
                {cards.map((resturant, i)=> (
                   <Grid item xs={width} key={`resturant_${i+1}`} >
                       <Resturant resturant={resturant}/>


                   </Grid>
                ))}
            </Grid>

       <Cart />
        </div>

        
    )
}

export default ResturantList
