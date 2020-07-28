import React from 'react';
import Categories from "./Categories";
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import findRest from '../api/zomato';


function load(title)
{
  if(document.getElementById('restaurants'))
  {
      ReactDOM.render(<LinearProgress />, document.getElementById('restaurants'));
  }
  findRest( title);
}
export default async function printExplore(useStyles)
{
  const classes = useStyles;
    const element =
    <reactFragment>
    <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField fullWidth id="searchField" label="Search for any category (eg: pizza, italian, etc)" /><Button onClick = {e=> load(document.getElementById('searchField').value)}color="primary">Search</Button>
        </form>
          <Grid container spacing={3} align = "center">
            
            {/* Catergory cards.. */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                 <Categories />
              </Paper>
            </Grid>
      
            <Grid item xs={12}>
              <Paper className={classes.paper}  minHeight = {300} id = "restaurants">
                 <LinearProgress />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        </reactFragment>
    
  ReactDOM.render(element, document.getElementById('mainContainer'));
}