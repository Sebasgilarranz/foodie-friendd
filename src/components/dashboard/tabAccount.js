import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {getUser,updateUser} from './../api/userApi';
import Button from '@material-ui/core/Button';
import explore from './tabExplore';



export default async function account(useStyles, user) {  
  const classes = useStyles;
  // var res = await getUser(user.user.auth.user.id);
  console.log(user);
  const element = 
  <reactFragment>
    <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
        <h4>Account Settings</h4>
          <Grid container spacing={3} alignItems= "center" justify = "center">
          <Grid item xs={3} alignItems= "center" justify = "center">
              <Paper elevation={3} alignItems= "center" justify = "center">
                <h6>{user.user.auth.user.email}</h6>
                <Button id = "submitChanges" vairant = "outlined" color = "primary" onClick = {e=> user.user.logoutUser()}>Logout</Button>
                
              </Paper>
            </Grid>
          </Grid>
        </Container>
    </reactFragment>
 ReactDOM.render(element, document.getElementById('mainContainer'));
  
}