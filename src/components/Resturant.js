import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import  CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import  CardActions from "@material-ui/core/CardActions";
import  Typography from "@material-ui/core/Typography";





import { connect } from "react-redux";
import {BrowserRouter as Router,

  Link} from 'react-router-dom'

import Divider from "@material-ui/core/Divider";



import { makeStyles } from '@material-ui/core/styles';





const useStyles = makeStyles((theme) => ({
link: {
textDecoration:'none'

},
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
content: {

padding:'12px 15px'
}
}));



function Resturant({ resturant, shoppingCartItems }) {
  const classes = useStyles();

  

  

  return (
    <div>
    <Link className={classes.link} to="/" >
    
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
      
  
       </CardActions>
       
      </Card>
    </Link>
    


    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};
export default connect(mapStatetoProps, null)(Resturant);

