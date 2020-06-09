import React from "react";




import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import  Typography from "@material-ui/core/Typography"

import { makeStyles } from "@material-ui/core/styles";




const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  content: {
    padding: "12px 15px",
  },
}));

function Food({ food, shoppingCartItems }) {
  const classes = useStyles();

  return (
    <div>
      <Link>
        <Card>
          <CardMedia className={classes.media} image={food.picture} />

          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h6" component="h6">
              {food.name}
            </Typography>
            <Divider />
            <Typography variant="body2" color="textSecondary" component="p">
              {
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit officiis maiores necessitatibus obcaecati! Laborum esse !"
              }
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default Food;
