import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getProfiles } from '../../actions/profileActions';

class Profile extends Component {

  state = {
    profiles: {}
  }

  componentWillMount() {
    this.props.getProfiles();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ profiles: nextProps.profiles });
  }


  render() {

    if(_.isEmpty(this.state.profiles))
      return <div></div>
   
    console.log(this.state.profiles);
    

    const profile = this.state.profiles.map((profile, index) => (
      <div className="card card-body bg-light mb-3" key={index}>
        <div className="row">
          <div className="col-2">
            <img className="rounded-circle" src={profile.user.avatar} alt="" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>{profile.status} at {profile.company}</p>
            <p>{profile.location}</p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
          </div>
          <div className="col-md-4  d-lg-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
             { 
                profile.skills.map((skill, index) => (
                  <li className="list-group-item" key={index}>
                    <i className="fa fa-check pr-1"></i>{skill}
                  </li>
                )) 
              }
            </ul>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">Browse and connect with developers</p>

                { profile }

            </div>
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    profiles: state.profileReducer.profiles
  }
}

export default connect(mapStateToProps, { getProfiles })(Profile);
