import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {ListItemAvatar,ListItemText , Avatar, ListItemIcon}from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {Close, Favorite}from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";

import hamburger from "../assets/hamburger.jpg"
import bread from "../assets/bread.jpg"
import meat from "../assets/meat.jpg"


const foods = [


{

name: "hamburger",
price:100,
src: hamburger

},
{

  name: "bread",
  price:100,
  src: bread
  
  },
  {

    name: "meat",
    price:100,
    src: meat
    
    }]
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Modal({ opened, close }) {

const classes = useStyles()
  return (
    <div>
      <Dialog open={opened} onClose={close} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>{close()}}
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

          {foods.map((food)=> {
          return ( <React.Fragment key={food.title}>
             <ListItem >
        <ListItemAvatar>
          <Avatar src={food.src} />
        </ListItemAvatar>
        <ListItemText primary={food.name} secondary={`N${food.price}`} />
     <ListItemIcon>
       <Favorite/>
     </ListItemIcon>
     
      </ListItem>
      <Divider />
            </React.Fragment>)
          })}
      
        </List>
      </Dialog>
    </div>
  );
}

export default Modal;
