import React  from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";


import Divider from "@material-ui/core/Divider";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  content: {
    padding: "12px 15px",
  },
  highlghts: {
    color: "#011627",
    margin: "0.5em 0",
    fontWeight: "bold",
  },

  locationList: {
    paddingInlineStart: "1em",
    listStyleType: "none",
    margin: "0",
  },
  location: {
    marginBottom: "5px",
    display: "flex",
  },
  locationSpan: {
    marginLeft: "2px",
  },
}));

/**
 * Displays a vendor to be selected by a user
 * @param {{
 * resturant: any}} props
 */
function Resturant(props) {
  const { resturant } = props;
  const classes = useStyles();

  return (
    <div>
      <Link className={classes.link} to="/">
        <Card>
          <CardMedia className={classes.media} image={resturant.picture} />

          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h6" component="h6">
              {resturant.name}
            </Typography>
            <Divider />
            <small className={classes.highlights}>Locations</small>
            <Typography variant="body2" color="textSecondary" component="p">
              <ul className={classes.locationList}>
                {resturant.location.map((l) => (
                  <li key={uuid()} className={classes.location}>
                    <RoomIcon />{" "}
                    <span className={classes.locationSpan}>
                      {" "}
                      {l.name_of_area + ", " + l.state}
                    </span>
                  </li>
                ))}
              </ul>
            </Typography>
          </CardContent>

          <CardActions></CardActions>
        </Card>
      </Link>
    </div>
  );
}

export default Resturant;
