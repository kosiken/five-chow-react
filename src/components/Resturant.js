import React, { useState } from "react";
import { Card, CardHeader, CardMedia, Avatar, CardContent, Typography, CardActions, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {VisibilityIcon} from "@material-ui/icons"
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

}));

function Resturant({ resturant }) {
  const classes = useStyles();
  return (
    <div>
      <Card>
          <CardHeader title={resturant.title} />
        <CardMedia className={classes.media} image={resturant.src} />
       <CardActions >
         <IconButton ariaLabel="view more">
           <VisibilityIcon />
         </IconButton>
       </CardActions>
      </Card>
    </div>
  );
}

export default Resturant;
