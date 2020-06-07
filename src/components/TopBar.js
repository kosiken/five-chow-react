
import React from "react";
import { connect } from "react-redux";
import {AppBar, Toolbar, Avatar, Menu, MenuItem, IconButton , Button , Typography } from "@material-ui/core";
import {ExitToApp,Favorite, AccountCircle } from "@material-ui/icons"
// import App from '../App';
import logo from "../assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";

import {  loginUser} from "../store/actions";
  







const useStyles = makeStyles((theme) => ({

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
  },
  loggedIn: {
  
      display: 'flex',
    alignItems: 'center'
},
avatar: {
marginRight: '10px'
}
  
  
}));


function TopBar({user,loginUser}){



    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        if(!anchorEl)setAnchorEl(event.currentTarget);
      };
    
      
      const handleClose = () => {
      if(!user.username)loginUser({email:'lion@e.com'})
        setAnchorEl(null);
        console.log(user)
      };


			function renderTopIcon(handleClosen){

if(user.username) {

return (
<Button className={classes.loggedIn}  color="inherit"
            onClick={handleClick}>
  <Avatar src={user.avatar} className={classes.avatar} /> <span  >{user.username}</span>
              <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=> {setAnchorEl(null)}}><Favorite className={classes.menuIcons} /> Profile</MenuItem>
        <MenuItem onClick={()=> {setAnchorEl(null)}} ><ExitToApp className={classes.menuIcons}/> LogOut</MenuItem>
       
      </Menu>
        </Button>
)
}

else {


return (<div> 

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
        <MenuItem onClick={handleClose}><Favorite className={classes.menuIcons} /> Sign Up</MenuItem>
        <MenuItem onClick={handleClose}><ExitToApp className={classes.menuIcons}/> Log In</MenuItem>
       
      </Menu>
      
</div>)

}


}

  const classes = useStyles();
	

return(   <AppBar color="primary" position="static">
        <Toolbar
          style={{
            minHeight: "80px",
          }}
        >
          <div className={classes.title}>
            <Avatar className={classes.large} src={logo}></Avatar>
          </div>
 
{renderTopIcon(handleClose)}

        </Toolbar>
      </AppBar>



)






}


   
const mapStatetoProps = (state) => {
  return {
    user: state.auth.user  };
};
export default connect(mapStatetoProps, {loginUser})(TopBar)
