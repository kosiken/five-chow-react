import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from '@material-ui/core/Divider';

import Drawer from '@material-ui/core/Drawer';

import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from "@material-ui/core/IconButton";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ExitToApp from "@material-ui/icons/ExitToApp";

import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from "@material-ui/icons/ShoppingCart";

import useWidth from "../hooks/useWidth";
import api from "../api";
import logo from "../assets/logo-meduim.png";

import { logoutUser } from "../store/actions";

const useStyles = makeStyles((theme) => ({

  appbar: {
    backgroundColor: "white !important",
  },
  link: {
    textDecoration: "none",
    color:'inherit'
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
    width: '50px',
    //  height: theme.spacing(4),
  },
  menuIcons: {
    marginLeft: '28%'
  },
  loggedIn: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  toolBar: {

    display: 'flex',
    justifyContent: 'space-between',
    '*': {
      flex: '1'
    },
  },
  desktopTitle: {

    position: 'absolute',
    width: '100%',

    textAlign: 'center',
  },
  desktopNav: {
    position: 'absolute',
    right: '10px',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
}));

/**
 * Renders the top bar of the webpage
 * @component
 */
function TopBar(props) {
  const { logoutUser, user, isAuthorized } = props;


  const [muser, setUser] = React.useState(user);
  React.useEffect(() => {
    if (muser.email !== user.email) {
      setUser(user);
    }
  }, [muser.email, user]);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const classes = useStyles();
  const isMobile = useWidth(true, false);

  function logUserOut() {
    handleDrawerClose();

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

  function renderDrawer() {

    return (

      <Drawer
        className={classes.drawer}
        onClose={handleDrawerClose}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >


        <List>
          {isAuthorized ? (
          <>
            <Link className={classes.link} to="/orderlist">
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon> <ShoppingCart /></ListItemIcon>
                   Orders
        </ListItem>
                </Link>
            <ListItem button onClick={logUserOut} >
              <ListItemIcon> <ExitToApp /></ListItemIcon>
              Sign out
            
            </ListItem>
            </>
          ) : (
              <>
                <Link className={classes.link} to="/login">
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon> <ExitToApp /></ListItemIcon>
                    Sign In
        </ListItem>
                </Link>
                <Divider />
                <Link className={classes.link} to="/signup">
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon> <HowToRegIcon /></ListItemIcon>
                    Sign up
        </ListItem>
                </Link>
              </>
            )}
        </List>

      </Drawer>);

  }
  if (isMobile) {
    return (

      <AppBar position="static" className={classes.appbar}>
        {renderDrawer()}

        {" "}
        <Toolbar
          className={classes.toolBar}
        >
          <IconButton edge="start" color="secondary" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>

          <Link to="/" className={classes.link}>
            <img alt="logo" className={classes.large} src={logo} />
          </Link>
          <Link className={classes.link} to="/cart">
            <IconButton color="inherit" aria-label="Shopping Cart"
            >
              <ShoppingCart />

            </IconButton>
          </Link>

        </Toolbar>

      </AppBar>

    );
  }

  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar
      >
        <div className={classes.desktopTitle} >
          <Link to="/" className={classes.link}>
            <img alt="logo" className={classes.large} src={logo} />
          </Link>
        </div>

        <div className={classes.desktopNav}>
          {isAuthorized ? (
<>
 <Link className={classes.link} to="/orderlist">
                  {" "}
                  <Button color="primary" elevation={0} >                   
                Orders
              </Button>
              </Link>
            <Button color="primary" onClick={logoutUser}>
             LogOut
           </Button>
</>
          ) : (
              <>
                <Link className={classes.link} to="/login">
                  {" "}
                  <Button color="primary" >
                    {" "}
                Sign In
              </Button>
                </Link>

                <Link className={classes.link} to="/signup">
                  {" "}
                  <Button color="primary" variant="contained" elevation={0} >
                    {" "}
                Sign up
              </Button>
                </Link></>
            )}
          <Link className={classes.link} to="/cart">
            <IconButton color="inherit" aria-label="Shopping Cart"
            >
              <ShoppingCart />

            </IconButton>
          </Link>
        </div>

      </Toolbar>

    </AppBar>
  )
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

  /**
   * This value shows whether the user is already logged in, 
   */
  isAuthorized: PropTypes.bool.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    debug: state.auth.debug,
    isAuthorized: state.auth.isAuthorized
  };
};
export default connect(mapStatetoProps, { logoutUser })(TopBar);
