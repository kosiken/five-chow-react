import React, { Component } from "react";
import {AppBar, Toolbar, Avatar, Menu, MenuItem, IconButton  } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";

import { Typography } from "@material-ui/core";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import {ExitToApp,Favorite, AccountCircle } from "@material-ui/icons"
// import App from '../App';
import logo from "../assets/logo.png";
import ResturantList from "../components/ResturantList"



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    display: "flex",
    alignItems:"center",
    justifyContent:"center"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  menuIcons: {
      fontSize: '12px',
      marginRight: '5px'
  }
}));

function MainPage() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      
      const handleClose = () => {
        setAnchorEl(null);
      };
  const classes = useStyles();
  return (
    <div class={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar
          style={{
            minHeight: "80px",
          }}
        >
          <div class={classes.title}>
            <Avatar className={classes.large} src={logo}></Avatar>
          </div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <AccountCircle />
          </IconButton>

          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}><Favorite className={classes.menuIcons} /> My account</MenuItem>
        <MenuItem onClick={handleClose}><ExitToApp className={classes.menuIcons}/> Logout</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
      <ResturantList />
      </div>
      
    </div>
  );
}

export default MainPage;
