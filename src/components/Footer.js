import React from "react";
// import { Link } from "react-router-dom";
import  Link  from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';

import Divider from "@material-ui/core/Divider";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from "@material-ui/core/IconButton";

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';


/* import google_play from '../assets/gp.png'

import app_store from '../assets/as.svg'
*/
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'white',
  

    width: '100%',
  
    bottom:'0',
    left:'0',
   
  },
  
  list: {

      textAlign: 'center',
          fontSize: '14px',

  },
  
  appStoresDiv: {
  display: 'flex',
justifyContent: 'center',
alignItems: 'center',
  
  },
  
  appStores: {
  	width: '100px'  
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
    
    <Divider style={{margin: '0 0 10px' }} />
    	
			 <Typography className={classes.list}>
			 Made with <span role="img" aria-label="love" >❤️ </span><span style={{
			 color:'#f0324b'
			 }}>500Chow</span>
			 </Typography>
			<div className={classes.list}>
			<List >
			
				<ListItemIcon>
					<Link className={classes.link} href="https://facebook.com/500chow">
						  <IconButton color="primary" aria-label="facebook">
						  <FacebookIcon fontSize="small" />
						  </IconButton>
					</Link>
				</ListItemIcon>
				
					<ListItemIcon>
					<Link className={classes.link} href="https://instagram.com/500chow">
						<IconButton color="primary" aria-label="instagram">
						<InstagramIcon fontSize="small" />
						</IconButton>
					</Link>
					</ListItemIcon>
					<ListItemIcon>
						<Link className={classes.link} href="https://twitter.com/500chow">
						<IconButton color="primary" aria-label="instagram">
						<TwitterIcon fontSize="small" />
							</IconButton>
					</Link>
				</ListItemIcon>
			
			
			</List>
			</div>
			
			{/*<div className={classes.appStoresDiv} >
			<img src={google_play} className={classes.appStores} />
			<img className={classes.appStores} src={app_store} />
			</div>
			*/}
	
 
     
    </footer>
  );
}

export default Footer;
