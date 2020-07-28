import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import {Dialog, DialogTitle, DialogContent, TextField, DialogActions,DialogContentText} from '@material-ui/core';
import {resendCode} from "../api/userApi";
import {Button,Paper} from '@material-ui/core/';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      errors: {},
      resendCode: false,
      resendCodeSuccess: false,
      resetEmail: ""
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
this.props.registerUser(newUser, this.props.history); 
  };


  onSubmitResendCode = async e =>
  {
    this.setState(await resendCode(this.state.resendEmail));
  }



render() {
    const { errors } = this.state;
return (
      <div className="container">
        <Paper elevation={3} m = {1000} style = {{width: 950, height: 700}}>
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
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
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <Button onClick = {e => this.setState({resendCode:true})} color="primary">Resend Confirmation Code?</Button>
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
                  Sign up
                </button>
              </div>
              <Dialog
                    title="Dialog With Actions"
                    // actions={actions}
                    modal={false}
                    open={this.state.resendCode}
                    onRequestClose={this.handleResendCodeClose}
                    fullWidth={true}
                    maxWidth = {'md'}
                    >
              <DialogTitle id="form-dialog-title">Resend Confirmation</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                      Enter email address to resend confirmation Code.
                    </DialogContentText>
                    <form>
                    <div className="input-field col s12">
                    <input
                          onChange={this.onChange}
                          value={this.state.resendEmail}
                          error={errors.resendEmailError}
                          id="resendEmail"
                          type="email"
                          className={classnames("", {
                            invalid: errors.resendEmailError
                          })}
                        />
                        <label htmlFor="resendEmail">Email</label>
                        <span className="red-text">
                          {errors.resendEmailError}
                        </span>
                      </div>
                      </form>
                        
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={e=> this.setState({resendCode:false})} color="primary">
                      Cancel
                     </Button>
                     <Button onClick={this.onSubmitResendCode} color="primary">
                         Resend
                     </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    title="Resend Code Success"
                    open={this.state.resendCodeSuccess}
                    onRequestClose={e => this.setState({resendCodeSuccess:false})}
                    >
                       <DialogTitle id="form-dialog-title">Confirmation code sent!</DialogTitle>
                       <DialogContentText align = "center">
                      Please check your email and follow the instructions.
                    </DialogContentText>
                    <DialogActions>
                      <Button onClick={e => this.setState({resendCodeSuccess:false})} color="primary">
                      Ok
                     </Button>
                    </DialogActions>
                  </Dialog>
            </form>
          </div>
        </div>
        </Paper>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));