import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getProfile } from '../actions/profileActions';
import profileReducer from '../reducers/profileReducer';

class Dashboard extends Component {

  
  componentWillMount() {
    this.props.getProfile();
  }




  render() {
    return (
      <div className="container">
        <div className="row">
            <h1>Dashboard</h1>
            <div className="col-md-12">
              profile
            </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  
  return {
    profile: state.profileReducer.profile,
    auth: state.authReducer
  }
}

export default connect(mapStateToProps, { getProfile })(Dashboard);
