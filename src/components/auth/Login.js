import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import {Button, Paper, Container} from '@material-ui/core';
import {Dialog, DialogTitle, DialogContent, TextField, DialogActions,DialogContentText} from '@material-ui/core';
import {resetPassword,confirmation, resetPassVer} from "../api/userApi";



class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      forgotPass: false,
      emailForgot: "",
      confirmSuccess: false,
      errorConfirm: false,
      verCodeOpen: false,
      verCode: "",
      newPass: "",
      newPassConf: "",
      resetSuccess: false,
      
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    const token = this.props.match.params.token;
    if(token)
    {
      this.handleToken(token);

    }
    
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      console.log(nextProps.props);
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    // console.log(nextProps.errors);
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
async handleToken(token)
{
    this.setState(await confirmation(token));

}

handleConfirmClose =  e => 
{
  e.preventDefault();
  this.setState({confirmSuccess: false});
}

handleErrorClose =  e => 
{
  e.preventDefault();
  this.setState({errorConfirm: false});
}
handleForgotOpen = e =>
{
  e.preventDefault();
  
  this.setState({forgotPass: true});
}
handleClose = e =>
{
  e.preventDefault();
  this.setState({forgotPass: false});
}

handleResetClose = e =>
{
  e.preventDefault();
  this.setState({verCodeOpen: false});
}
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  onSubmitForgot = async e => {
    this.setState(await resetPassword(this.state.emailForgot));
  }

  handleResetPassSuccessClose = e => 
  {
    this.setState({resetSuccess:false});
  }

  

  onSubmitReset = async e => {
    const userData = 
    {
      verification: this.state.verCode,
      password: this.state.newPass,
      password2: this.state.newPassConf
    };
    
    
    this.setState(await resetPassVer(userData));


    
    // console.log(resetPassword(this.state.emailForgot));
  }
render() {
    const { errors } = this.state;
return (
      <div className="container" >
        <Paper elevation={3} m = {1000} style = {{width: 950, height: 600}}>
        <div  className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                <p className="grey-text text-darken-1">
                  <Button onClick = {this.handleForgotOpen} color="primary">Forgot Password?</Button></p>
                  <Dialog
                    title="Dialog With Actions"
                    // actions={actions}
                    modal={false}
                    open={this.state.forgotPass}
                    onRequestClose={this.handleClose}
                    fullWidth={true}
                    maxWidth = {'md'}
                    >
                      <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                      Enter email address to reset password.
                    </DialogContentText>
                    <div className="input-field col s12">
                    <input
                          onChange={this.onChange}
                          value={this.state.emailForgot}
                          error={errors.emailForgot}
                          autoComplete = "new-password"
                          id="emailForgot"
                          type="email"
                          className={classnames("", {
                            invalid: errors.emailForgot || errors.emailForgotnotfound
                          })}
                        />
                        
                        <label htmlFor="emailForgot">Email</label>
                        <span className="red-text">
                          {errors.emailForgot}
                          {errors.emailForgotnotfound}
                        </span>
                        </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                      Cancel
                     </Button>
                     <Button onClick={this.onSubmitForgot} color="primary">
                         Reset
                     </Button>
                    </DialogActions>
                  </Dialog>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>

                <Dialog
                    title="Email confirmed"
                    open={this.state.confirmSuccess}
                    onRequestClose={this.handleConfirmClose}
                    >
                       <DialogTitle id="form-dialog-title">Email successfully confirmed</DialogTitle>
                       <DialogContentText align = "center">
                      Please log in
                    </DialogContentText>
                    <DialogActions>
                      <Button onClick={this.handleConfirmClose} color="primary">
                      Ok
                     </Button>
                    </DialogActions>
                  </Dialog>

                  <Dialog
                    title="Email confirm failed."
                    open={this.state.errorConfirm}
                    onRequestClose={this.handleErrorClose}
                    >
                       <DialogTitle id="form-dialog-title">Could not confirm</DialogTitle>
                       <DialogContentText align = "center">
                      There was an error confirming your email. Confirmation may be invalid or expired.
                    </DialogContentText>
                    <DialogActions>
                      <Button onClick={this.handleErrorClose} color="primary">
                      Ok
                     </Button>
                    </DialogActions>
                  </Dialog>



                  <Dialog
                    title="Reset Password"
                    // actions={actions}
                    modal={false}
                    open={this.state.verCodeOpen}
                    onRequestClose={this.handleClose}
                    fullWidth={true}
                    maxWidth = {'md'}
                    >
                      <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                      Enter Verification code and new password.
                    </DialogContentText>
                    <div className="input-field col s12">
                    <input
                          onChange={this.onChange}
                          value={this.state.verCode}
                          error={errors.verCodeError}
                          autoComplete = "new-password"
                          id="verCode"
                          type="email"
                          className={classnames("", {
                            invalid: errors.verCodeError
                          })}
                        />
                        <label htmlFor="verCode">Verification Code</label>
                        <span className="red-text">
                          {errors.verCodeError}
                        </span>
                        </div>
                        <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.newPass}
                          autoComplete = "new-password"
                          error={errors.newPassError}
                          id="newPass"
                          type="password"
                          className={classnames("", {
                            invalid: errors.newPassError
                          })}
                        />
                        <label htmlFor="newPassError">New Password</label>
                        <span className="red-text">
                          {errors.newPassError}
                        </span>
                        </div>
                        <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.newPassConf}
                          autoComplete = "new-password"
                          error={errors.newPassConfError}
                          id="newPassConf"
                          type="password"
                          className={classnames("", {
                            invalid: errors.newPassConfError
                          })}
                        />
                        <label htmlFor="newPassConfError">Confirm Password</label>
                        <span className="red-text">
                          {errors.newPassConfError}
                        </span>
                        </div>
                        
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleResetClose} color="primary">
                      Cancel
                     </Button>
                     <Button onClick={this.onSubmitReset} color="primary">
                         Reset
                     </Button>
                    </DialogActions>
                  </Dialog>


                  <Dialog
                    title="Password Successfully Changed!"
                    open={this.state.resetSuccess}
                    onRequestClose={this.handleResetPassClose}
                    >
                       <DialogTitle id="form-dialog-title">Password Successfully Changed!</DialogTitle>
                       <DialogContentText align = "center">
                      Please log in
                    </DialogContentText>
                    <DialogActions>
                      <Button onClick={this.handleResetPassSuccessClose} color="primary">
                      Ok
                     </Button>
                    </DialogActions>
                  </Dialog>
              </div>
            </form>
            </div>
          
        </div>
        </Paper>
        </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);