import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User

const serverUrl = "https://foodie-friendd-backend.herokuapp.com";
// const serverUrl = "http://localhost:5000"; // BAKCEND HOST
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(serverUrl + "/api/auth/register1/", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {

const jwt = require("jsonwebtoken");
  console.log(userData);
  axios
    .post(serverUrl + "/api/auth/login1/", userData).
    then(async function(res){
      // Save to localStorage
// Set token to localStorage
      const payload = {
        id: res.data.user.id,
        email: res.data.user.email
      };
      var token1;
      await jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
        }) 
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};