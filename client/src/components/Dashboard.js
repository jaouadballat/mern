import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProfile } from '../actions/profileActions';
import profileReducer from '../reducers/profileReducer';

class Dashboard extends Component {

  componentWillMount() {
    this.props.getProfile();
  }

renderDashboard() {

if(this.props.error) {
  return (
    <div>
      <p>You have not yet set a profile. Please try to add some info</p>
      <button className="btn btn-info">Create Profile</button>
    </div>
  );
  } else {
    if(this.props.profile) {
      return <div>your profile</div>
    }else {
      return <div>waiting</div>
    }
  }

  }

  render() {
    return (
      <div className="container">
        <div className="row">
            <h1>Dashboard</h1>
            <div className="col-md-12">
              { this.renderDashboard() }
            </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profileReducer.profile,
    error: state.errorsReducer.errors
  }
}

export default connect(mapStateToProps, { getProfile })(Dashboard);
