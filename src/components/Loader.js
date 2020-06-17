import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "85vh",
    width: "100vw",
  },
  loader: {
    width: "100px",
    height: "100px",
    position: "relative",
  },
});

/**
 * Just returns the spinner seen when you open the
 * web page
 */
function Loader() {
  let classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.loader}>
          <div className="overlay-circle"></div>
          <div className="overlay-circle" id="no2"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
