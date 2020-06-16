import React, { useState, useEffect } from "react";

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
function FoodList(props) {
  let [mfoods, setFoods] = useState(props.foods);

  let [isLoading, setLoading] = useState(!props.foods.length);
  const [error, setError] = useState(false);
  const width = useWidth();

  const classes = useStyles();

  const handleError = function (err) {
    console.log(err.message);

    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    if (mfoods.length == 0) {
      if (props.debug) {
        tempAsyncFunction(3000)
          .then((val) => {
            console.log("here2");
            props.fetchFoods();
          })
          .catch(handleError);
      } else {
        console.log("here2");
        api
          .foodItemsList()
          .then((s) => {
            console.log(s);
            props.fetchFoods(props.debug, s);
          })
          .catch(handleError);
      }
    }
    if (props.foods.length !== mfoods.length) {
      setFoods(props.foods);

      setLoading(false);
    }
  }, [props.foods, mfoods.length]);

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
        width: window.innerWidth > 500 ? "85%" : "100%",
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
        {mfoods.map((food) => (
          <Grid item xs={width} key={`food_${food.id}`}>
            <Food food={food} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    foods: state.food.foods,
    debug: state.auth.debug,
  };
};

export default connect(mapStatetoProps, { fetchFoods })(FoodList);
