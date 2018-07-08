import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getProfileByHandle } from '../../actions/profileActions';
import Header from './Header';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import { networkInterfaces } from 'os';

class Profile extends Component {
    
    state = {
        profile: {},
        errors: ''
    }

    componentWillMount() {
        this.props.getProfileByHandle(this.props.match.params.handle);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({profile: nextProps.profile})
        if(!_.isEmpty(nextProps.errors)) {
         this.setState({errors: nextProps.errors.error})
        }
    }


  render() {
      if(this.state.errors)
        return <p className="d-flex justify-content-center align-items-center">{this.state.errors}</p>
    return (
        <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-6">
                                <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                            </div>
                            <div className="col-6">

                            </div>
                        </div>          

                        <Header profile={this.state.profile} />
                        <About profile={this.state.profile} />

                        <div className="row">
                            <Experience profile={this.state.profile} />
                            <Education profile={this.state.profile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

    )
  }
}

function mapStateToProps(state) {
    return {
        profile: state.profileReducer.handle,
        errors: state.errorsReducer.errors
    }
}

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
