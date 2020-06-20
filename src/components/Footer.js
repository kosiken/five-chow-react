import React from "react";
// import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import logo from "../assets/logo-meduim.png";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.light,
    padding: "20px",
    color: "white",
    width: '100%',
    position:'absolute',
    bottom:'0',
    left:'0'
  },
  large: {
    width: theme.spacing(7),
    //  height: theme.spacing(4),
  },

  menu: {
    color: "white",
    paddingInlineStart: 0,
  },
}));
/**
 * @component
 * Footer of the app
 */
function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div>
        <image className={classes.large} src={logo} alt="logo" />
      </div>
      <Typography>&copy; Five Hundred Chow, 2020</Typography>
    </footer>
  );
}

export default Footer;
