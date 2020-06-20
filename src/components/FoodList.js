import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Food from "./Food";
import { fetchFoods } from "../store/actions";
import Loader from "./Loader";
import api from "../api";
import useWidth from "../hooks/useWidth";

const useStyles = makeStyles((theme) => ({
  errorDiv: {
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",

    height: "70vh",

    padding: "20px",
  },
}));

function tempAsyncFunction(duration, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (shouldFail) {
        reject("There was ab error");
      } else {
        resolve("ok");
      }
    }, duration);
  });
}

/**
 * Displays an array of food items to be selected by a user
 * @component
 */
function FoodList(props) {
  const { foods, debug, fetchFoods, selectedResturant } = props;
  let [mfoods, setFoods] = useState(foods);

  let [isLoading, setLoading] = useState(!foods.length);
  const [error, setError] = useState(false);
  const width = useWidth(12, 4);

  const classes = useStyles();

  /**
   * Utility function to handle HTTP errors
   * @param {Error} err
   */
  const handleError = function (err) {
    console.log(err.message);

    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    if (mfoods.length === 0) {
      if (debug) {
        tempAsyncFunction(3000)
          .then(() => {
            // for debugging
            console.log("here2");
            fetchFoods();
          })
          .catch(handleError);
      } else {
        // for debugging
        console.log("here2");
        api
          .foodItemsList()
          .then((s) => {
            console.log(s);
            fetchFoods(debug, s);
          })
          .catch(handleError);
      }
    }
    if (foods.length !== mfoods.length) {
      setFoods(foods);

      setLoading(false);
    }
  }, [debug, fetchFoods, foods, mfoods.length]);
  
  const renderResturants = function(_width) {
  
  if(selectedResturant) {
  
  return mfoods.filter(food => food.resturant_id === selectedResturant).map((food) => (
          <Grid item xs={_width} key={`food_${food.id}`}>
            <Food food={food} />
          </Grid>
        ))
   
  }
  
    return mfoods.map((food) => (
          <Grid item xs={_width} key={`food_${food.id}`}>
            <Food food={food} />
          </Grid>
        ))
    
  
  }
  
  

  if (error) {
    return (
      <div className={classes.errorDiv}>
        <Typography color="primary" variant="h3">
          There was an error completing this request
        </Typography>
        <Typography color="primary">
          Cross-Origin Request Blocked: The Same Origin Policy disallows reading
          the remote resource at http://695135ee6c6f.ngrok.io/api/fooditems/.
          (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)
        </Typography>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }
  
  
  

  return (
    <div
      style={{
        width: width === 4 ? "85%" : "100%",
        margin: "0 auto",
      }}
    >
      <Grid
        style={{
          margin: "0 auto",
        }}
        container
        item
        justify="center"
        alignItems="center"
        xs={12}
        spacing={3}
      >
        {renderResturants(width)}
           </Grid>
    </div>
    )
}

FoodList.propTypes = {
  /**
   * An array of food items
   */
  foods: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * Check to see if we are in production
   */
  debug: PropTypes.bool.isRequired,

  /**
   * Action to get foods from api
   */
  fetchFoods: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    foods: state.food.foods,
    debug: state.auth.debug,
    selectedResturant: state.food.selectedResturant
  };
};

export default connect(mapStatetoProps, { fetchFoods })(FoodList);
