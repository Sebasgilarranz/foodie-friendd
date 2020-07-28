import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser} from "../../actions/authActions";
import Explore from './Explore.js';


class Dashboard extends Component {
render() {
    const { user } = this.props.auth;
    console.log(this.props);
return (
      <React.Fragment>
          <Explore user = {this.props}/>
      </React.Fragment>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);