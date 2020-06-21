import React from "react";
// import { Link } from "react-router-dom";
import  Link  from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import Divider from "@material-ui/core/Divider";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'white',
    padding: "20px 0 0",

    width: '100%',
  
    bottom:'0',
    left:'0',
    marginTop: theme.spacing(2),
  },
  
  list: {

      textAlign: 'center',
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
    	
			 <Typography className={classes.list}>&copy; Five Hundred Chow, 2020</Typography>
			<div className={classes.list}>
			<List >
			
				<ListItemIcon>
					<Link className={classes.link} href="https://facebook.com/500chow">
						<FacebookIcon color="secondary"/>
					</Link>
				</ListItemIcon>
				
					<ListItemIcon>
					<Link className={classes.link} href="https://instagram.com/500chow">
						<InstagramIcon color="secondary" />
					</Link>
					</ListItemIcon>
					<ListItemIcon>
						<Link className={classes.link} href="https://twitter.com/500chow">
						<TwitterIcon color="secondary"/>
					</Link>
				</ListItemIcon>
			
			
			</List>
			</div>
			
	
 
     
    </footer>
  );
}

export default Footer;
