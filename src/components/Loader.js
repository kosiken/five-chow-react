import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo_meduim from "../assets/logo-meduim.png";
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
  imageLogo: {
  width: "100px",
    height: "100px",
  }
});

function Loader() {
    let classes = useStyles()
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.loader}>
          <img className={classes.imageLogo} src={logo_meduim} />
          <div className="overlay-circle"></div>
          <div className="overlay-circle" id="no2"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
