import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import FoodList from "./FoodList";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        minHeight: '90vh',
    },
    vendorPaper:{
    padding: '1em',
    backgroundColor:'#f0324b',
    color: 'white',
    
    },
}));



export const RestaurantPage = (props) => {
 const classes = useStyles();
    if (!props.selectedResturant) {
        return <Redirect to={"/"} />;
    }
    return (
        <div className={classes.root} >
            <Paper className={classes.vendorPaper}>
                <Typography gutterBottom variant="h6" component="h6">
                    {props.selectedResturant.name}
                </Typography>
            </Paper>
            <FoodList selectedResturant={props.selectedResturant.id} />

        </div>
    )
}

const mapStateToProps = (state) => ({


    selectedResturant: state.food.selectedResturant,

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage)
