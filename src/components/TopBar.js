import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";

import { ExitToApp } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

import api from "../api";
import logo from "../assets/logo-meduim.png";

import { logoutUser } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "85%",
    margin: "0 auto",
  },
  appbar: {
    backGroundColor: "none !important",
  },
  link: {
    textDecoration: "none",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  large: {
    width: theme.spacing(7),
    //  height: theme.spacing(4),
  },
  menuIcons: {
    fontSize: "16px",
    marginRight: "5px",
  },
  loggedIn: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

/**
 * Renders the top bar of the webpage
 * @component
 */
function TopBar(props) {
  const { logoutUser, user } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [muser, setUser] = React.useState(user);
  React.useEffect(() => {
    if (muser.email !== user.email) {
      setUser(user);
    }
  }, [muser.email, user]);
  const handleClick = (event) => {
    if (!anchorEl) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function logUserOut() {
    setAnchorEl(null);
    if (!props.debug) {
      api
        .logOut(props.token)
        .then((v) => {
          logoutUser();
        })
        .catch((e) => {
          logoutUser();
          console.log(e);
        });
      return;
     
    }
    logoutUser();
  }

  function renderTopIcon(handleClosen) {
    if (muser.email) {
      return (
        <div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <Avatar className={classes.avatar}>
              {" "}
              {muser.email.slice(0, 2).toUpperCase()}{" "}
            </Avatar>
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logUserOut}>
              <ExitToApp className={classes.menuIcons} /> LogOut
            </MenuItem>
          </Menu>
        </div>
      );
    } else {
      if (window.innerWidth > 500) {
        return (
          <div>
            <Link className={classes.link} to="/login">
              {" "}
              <Button color="primary" variant="outlined" onClick={handleClose}>
                {" "}
                Sign In
              </Button>
            </Link>

            <Link className={classes.link} to="/signup">
              {" "}
              <Button color="primary" variant="contained" onClick={handleClose}>
                {" "}
                Sign up
              </Button>
            </Link>
          </div>
        );
      }

      return (
        <Link className={classes.link} to="/signup">
          {" "}
          <Button color="primary" variant="contained" onClick={handleClose}>
            {" "}
            Sign up
          </Button>
        </Link>
      );
    }
  }

  const classes = useStyles();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <div className={classes.container}>
        {" "}
        <Toolbar
          style={{
            minHeight: "80px",
          }}
        >
          <div className={classes.title}>
            <Link to="/">
              <img alt="logo" className={classes.large} src={logo} />
            </Link>
          </div>

          {renderTopIcon(handleClose)}
        </Toolbar>
      </div>
    </AppBar>
  );
}

TopBar.propTypes = {
  /**
   * The current user
   */
  user: PropTypes.object,

  /**
   * The api auth token
   */
  token: PropTypes.string.isRequired,

  /**
   * Check to see if we are in production
   */
  debug: PropTypes.bool.isRequired,

  /**
   * Action to log out the current user after a
   * successful api request
   */
  logoutUser: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    debug: state.auth.debug,
  };
};
export default connect(mapStatetoProps, { logoutUser })(TopBar);
