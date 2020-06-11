
import React from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import  Toolbar from "@material-ui/core/Toolbar";
import  Avatar from "@material-ui/core/Avatar";
import  Menu from "@material-ui/core/Menu";
import  MenuItem from "@material-ui/core/MenuItem";
import  Button from "@material-ui/core/Button";
import  Typography  from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {ExitToApp,Favorite, AccountCircle } from "@material-ui/icons";
import { Link } from 'react-router-dom'
// import App from '../App';
import logo from "../assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";

import {  loginUser} from "../store/actions";
  






const useStyles = makeStyles((theme) => ({
appbar:{
backGroundColor:'none !important'

},link: {
textDecoration:'none'

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
<div>

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
        <MenuItem onClick={()=> {setAnchorEl(null)}}><Favorite className={classes.menuIcons} /> <Avatar src={user.avatar} className={classes.avatar} /> <span  >{user.username}</span> Profile</MenuItem>
        <MenuItem onClick={()=> {setAnchorEl(null)}} ><ExitToApp className={classes.menuIcons}/> LogOut</MenuItem>
       
      </Menu>
        </div>
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
        <Link className={classes.link} to="/signup" ><MenuItem onClick={handleClose}><Favorite className={classes.menuIcons} /> Sign Up</MenuItem></Link>
       <Link className={classes.link} to="/login" > <MenuItem onClick={handleClose}><ExitToApp className={classes.menuIcons}/> Log In</MenuItem></Link>
       
      </Menu>
      
</div>)

}


}

  const classes = useStyles();
	

return(   <AppBar position="static" color="transparent">
        <Toolbar
          style={{
            minHeight: "80px",
          }}
        >
          <div className={classes.title}>
          <Link to="/">
            <Avatar className={classes.large} src={logo}></Avatar>
            </Link>
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
