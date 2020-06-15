import React, {useState, useEffect} from 'react'

//import Button from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import  Typography from "@material-ui/core/Typography"
import Backdrop from "@material-ui/core/Backdrop"
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Item from "./Item";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
link: {
textDecoration:'none'

},
  root: {
    maxWidth: 345,
    cursor:'pointer'
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
 
  content: {
    padding: "12px 15px",
  },
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  button: {
  
  width: '100%',
  textAlign: 'center'
  },


  vendorTitle: {
  margin: '5px 0 2px 0'
  },
  highlghts: {

color: '#011627',
margin:'0.5em 0',
fontWeight: 'bold'
},
}));

function Food({ food, shoppingCartItems }) {
  const classes = useStyles();
    const [state, setState] = React.useState({
    open: false});
    
    
  const handleClose = () => {
    setState({open: false})
  };
  const handleToggle = () => {
    setState({open: !state.open})
  };

  function cf(id ) {
  let i=0;
  for(let f of shoppingCartItems){
  if(f.id=== id) i++;
  
  }
  return i
  }




  return (
    <div>
   
        <Card className={classes.root} onClick={handleToggle} elevation={0} >
          <CardMedia className={classes.media} image={food.picture} />

          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h6" className={classes.foodTitle} component="h6">
              {food.name}
            </Typography>
            <Divider />
            
     <Typography className={classes.vendorTitle}> {food.resturantName} </Typography>
     <div>
          <small>{`N${food.price}`} </small>
       </div>    
          </CardContent>
          
        </Card>

      <Backdrop className={classes.backdrop} open={state.open} >
      <Paper elevation={3}>
<Item  food={food} count={cf}/>
<Button className={classes.button} color="primary" onClick={handleClose}> close </Button>
</Paper>
</Backdrop>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
  
    shoppingCartItems: state.cart.shoppingCartItems,
  };
};

export default connect(mapStatetoProps, null )(Food);
