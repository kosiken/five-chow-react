
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
import logo from "../assets/logo-meduim.png";
import { makeStyles } from "@material-ui/core/styles";

import {  loginUser} from "../store/actions";
  






const useStyles = makeStyles((theme) => ({
container: {
width:'85%',
margin: '0 auto'
},
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
  //  height: theme.spacing(4),
  },
  menuIcons: {
      fontSize: '16px',
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


function TopBar(props){

let{loginUser} = props

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [muser, setUser] = React.useState(props.user)
    React.useEffect(()=> {
    
    if(muser.username !==   props.user.username){
    setUser(props.user)
    }
    
    }, [props.user])
    const handleClick = (event) => {
        if(!anchorEl)setAnchorEl(event.currentTarget);
      };
    
      
      const handleClose = () => {
    
        setAnchorEl(null);
        console.log(muser)
      };


			function renderTopIcon(handleClosen){

if(muser.username) {

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
        <MenuItem onClick={()=> {setAnchorEl(null)}}> <Avatar src={muser.avatar} className={classes.avatar} /> <span  >{muser.username}</span> Profile</MenuItem>
        <MenuItem onClick={()=> {setAnchorEl(null)}} ><ExitToApp className={classes.menuIcons}/> LogOut</MenuItem>
       
      </Menu>
        </div>
)
}

else {
if(window.innerWidth > 500){

return (
<div>
    
        
       <Link className={classes.link} to="/login" > <Button color="primary" variant="outlined" onClick={handleClose}>  Sign In
       </Button></Link>
       
     
       <Link className={classes.link} to="/signup" > <Button color="primary" variant="contained" onClick={handleClose}>  Sign up
       </Button></Link>
       </div>
      
)
}

return (

       
     
       <Link className={classes.link} to="/signup" > <Button color="primary" variant="contained" onClick={handleClose}>  Sign up
       </Button></Link>
    
      
)
}


}

  const classes = useStyles();
	

return(  <AppBar position="static" color="transparent">
      <div className={classes.container}>   <Toolbar
          style={{
            minHeight: "80px",
          }}
        >
          <div className={classes.title}>
          <Link to="/">
            <img className={classes.large} src={logo}/>
            </Link>
          </div>

{renderTopIcon(handleClose)}

        </Toolbar>
            </div>   
      </AppBar>



)






}


   
const mapStatetoProps = (state) => {
  return {
    user: state.auth.user  };
};
export default connect(mapStatetoProps, {loginUser})(TopBar)
