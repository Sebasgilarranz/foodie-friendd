import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GridList from '@material-ui/core/GridList';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {addRestaurant, isFav, removeFav} from '../api/userApi';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

function hasImage(rest)
{
    
    if(rest.restaurant.featured_image == "")
    {
        return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    }else return rest.restaurant.featured_image;
}
function getStars(rating)
{
  if(rating<=3)
  {
    return <StarBorderIcon aria-label="add to favorites">rating</StarBorderIcon>
  }else if (rating>3 && rating < 4.5)
  {
    return <StarHalfIcon aria-label="add to favorites">rating</StarHalfIcon>
  }else if (rating>=4.5)
  {
    return <StarIcon aria-label="add to favorites">rating</StarIcon>
  }
}

function setFavorite(restId)
{
  console.log(restId);
  addRestaurant(restId);
}
function removeFavorite(restId)
{
  removeFav(restId);
}

async function isFavorite(restData)
{
  const fav = await isFav(restData);
  if(fav == 1)
  {
    console.log("DELETE");
    removeFavorite(restData);
  }else
  {
    console.log("ADD");
    setFavorite(restData);
  }
}

export default function printCards(cat){

    const element = 
    <div style = {{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden'}}>
    <GridList  style={{flexWrap: 'nowrap', transform: 'translateZ(0)'}}>
    {cat.data.restaurants.map((restaurant) => 
    <Card style = {{minWidth: 345, height: 450}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style = {{backgroundColor: red[500]}}>
              {restaurant.restaurant.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title= {restaurant.restaurant.name}
        subheader={restaurant.restaurant.location.address + "\n" + restaurant.restaurant.phone_numbers}
      />
      <CardMedia
        style={{height: 0, paddingTop: '56.25%'}}
        image = {hasImage(restaurant)}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {restaurant.restaurant.highlights.slice(0,10).map((highlight) => 
            <label>{highlight}, </label>
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        
        <FavoriteIcon onClick = {e => isFavorite(restaurant.restaurant)}/>
      
        </IconButton>
        {getStars(restaurant.restaurant.user_rating.aggregate_rating)}
      </CardActions>
      
    </Card>
    )}
    </GridList>
    </div>;
  if(document.getElementById("restaurants"))
  {
      ReactDOM.render(element, document.getElementById('restaurants'));
  }

}