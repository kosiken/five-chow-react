import React, { useState } from "react";
import { Card, CardHeader, CardMedia,  CardContent,  CardActions, IconButton , Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { connect } from "react-redux";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import {Close, Favorite}from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";


import { makeStyles } from '@material-ui/core/styles';
import {Visibility} from "@material-ui/icons"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import hamburger from "../assets/hamburger.jpg"
import bread from "../assets/bread.jpg"
import meat from "../assets/meat.jpg"
import Item from "./Item";


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




const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
content: {

padding:'12px 15px'
}
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Resturant({ resturant, shoppingCartItems }) {
  const classes = useStyles();
  const [modal, setModal ] = useState(false);
  
  let [foods, addFood] = useState(foodlists)
  const addAfood = function(name) {
    foods.find(food => food.name == name).count++;
    addFood(foods)
  }
  
  
  function cf(id ) {
  let i=0;
  for(let f of shoppingCartItems){
  if(f.id=== id) i++;
  
  }
  return i
  }
  return (
    <div>
      <Card>
       
        <CardMedia className={classes.media} image={resturant.picture} />
        
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6" component="h6">
            {resturant.name}
          </Typography>
          <Divider/>
                <Typography variant="body2" color="textSecondary" component="p">
           {'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit officiis maiores necessitatibus obcaecati! Laborum esse !'}
          </Typography>
           </CardContent>
       
       <CardActions >
         <IconButton aria-label="view more"
         onClick={()=> {
           setModal(true)
         }}>
           <Visibility color="primary" />
         </IconButton>
       </CardActions>
      </Card>
   


    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};
export default connect(mapStatetoProps, null)(Resturant);

