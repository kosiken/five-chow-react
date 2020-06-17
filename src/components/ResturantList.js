import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

/**
 * Displays an array of vendors to be selected by a user
 * @component
 */
function ResturantList(props) {
  const { resturants, fetchResturants } = props;

  let [mresturants, setResturantsState] = useState(resturants);
  const classes = useStyles();

  let [isLoading, setLoading] = useState(!props.resturants.length);
  const [error, setError] = useState(false);
  const width = useWidth(12, 4);

  const handleError = function (err) {
    console.log(err.message);

    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    console.log(resturants, "ll");
    if (resturants.length === 0) {
      api
        .vendorsList()
        .then((nresturants) => {
          fetchResturants(nresturants);
        })
        .catch(handleError);
    }
    if (resturants.length !== mresturants.length) {
      setResturantsState(resturants);

      setLoading(false);
    }
  }, [resturants, mresturants.length, fetchResturants]);
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
        {mresturants.map((resturant, i) => (
          <Grid item xs={width} key={`resturant_${resturant.id}`}>
            <Resturant resturant={resturant} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

ResturantList.propTypes = {
  /**
   * An array of vendors to display
   */
  resturants: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStatetoProps = (state) => {
  return {
    resturants: state.food.resturants,
  };
};

export default connect(mapStatetoProps, { fetchResturants })(ResturantList);
