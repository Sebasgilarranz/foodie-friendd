import React from 'react';
import ReactDOM from 'react-dom';
import {getFavs} from '../api/userApi';
import {findFavorites} from '../api/zomato';
import {Container, Grid, Paper} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import printFavorites from './printFavorites';

export async function getFavorites()
{
  const favs = await getFavs();
  // const data = await findFavorites(favs);
  // console.log(favs.data);
  return favs.data;
}


export default async function favorites(useStyles) {
  
  const classes = useStyles;
  const element = 
    <div className={classes.appBarSpacer}>
      <Container maxWidth="lg" className={classes.containerFavorites}>
      <h4>Favorites</h4>
        <div style = {{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden'}}>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper} id = "favorites">
                  <LinearProgress />
                  </Paper>
                </Grid>
              </Grid>
              
          </div>
      </Container>
      </div>;
  
  ReactDOM.render(element, document.getElementById('mainContainer'));
  printFavorites ( await getFavorites());
}