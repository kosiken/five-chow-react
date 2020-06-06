import React, { useState } from "react";
import { Card, CardHeader, CardMedia,  CardContent,  CardActions, IconButton , Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";


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


function Resturant({ resturant }) {
  const classes = useStyles();
  const [modal, setModal ] = useState(false);
  
  let [foods, addFood] = useState(foodlists)
  const addAfood = function(name) {
    foods.find(food => food.name == name).count++;
    addFood(foods)
  }
  
  return (
    <div>
      <Card>
       
        <CardMedia className={classes.media} image={resturant.src} />
        
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6" component="h6">
            {resturant.title}
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
   

<Dialog fullScreen open={modal} onClose={()=> {
                setModal(false)
              }} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=> {
                setModal(false)
              }}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Foods
            </Typography>
           
          </Toolbar>
        </AppBar>
        <List>

          {foodlists.map((food, i)=> {
          return ( <Item key={`food_${i+1}`} food={food} />)
          })}
      
        </List>
      </Dialog>

    </div>
  );
}

export default Resturant;
