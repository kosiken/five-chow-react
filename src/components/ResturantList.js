import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Resturant from "./Resturant";
import Loader from "./Loader";
import { fetchResturants } from "../store/actions";
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

function ResturantList(props) {
  //
  let r = props.resturants;

  let [resturants, setResturantsState] = useState(r);
  const classes = useStyles();

  let [isLoading, setLoading] = useState(!props.resturants.length);
  const [error, setError] = useState(false);
  const width = useWidth();

  const handleError = function (err) {
    console.log(err.message);

    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    console.log(resturants, "ll");
    if (props.resturants.length == 0) {
      api
        .vendorsList()
        .then((resturants) => {
          props.fetchResturants(resturants);
        })
        .catch(handleError);
    }
    if (props.resturants.length !== resturants.length) {
      setResturantsState(props.resturants);

      setLoading(false);
    }
  }, [props.resturants, resturants.length]);
  //s

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
        {resturants.map((resturant, i) => (
          <Grid item xs={width} key={`resturant_${resturant.id}`}>
            <Resturant resturant={resturant} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    resturants: state.food.resturants,
  };
};

export default connect(mapStatetoProps, { fetchResturants })(ResturantList);
