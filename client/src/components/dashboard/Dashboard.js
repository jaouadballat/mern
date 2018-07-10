import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import { getProfile, deleteProfile } from '../../actions/profileActions';
import Experiences from './Experiences';
import Educations from './Educations';

class Dashboard extends Component {

  
  componentWillMount() {
    this.props.getProfile();
  }


  onSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.deleteProfile()

          swal("This data has been deleted successfully!", {
            icon: "success",
          });
        }
      });
    
  }
  


renderDashboard = () => {
    if (!this.props.profile) {
      return <Link to="create-profile" className="btn btn-info">Create Profile</Link>
    } else {
      return <div>
                <div className="btn-group mb-4" role="group">
                  <Link to="/edit-profile" className="btn btn-light">
                  <i className="fa fa-user-circle text-info mr-1"></i> Edit Profile</Link>
                <Link to="/add-experience" className="btn btn-light">
                  <i className="fa fa-black-tie text-info mr-1"></i>
                  Add Experience</Link>
                <Link to="/add-education" className="btn btn-light">
                  <i className="fa fa-graduation-cap text-info mr-1"></i>
                  Add Education</Link>
              </div>

            <Experiences experiences={this.props.profile.experience} />
            <Educations educations={this.props.profile.education} />

             <form onSubmit={this.onSubmit}>
               <button className="btn btn-danger" type="submit">Delete Profile</button>
             </form>
     </div>
   }

 }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="display-4">Dashboard</h1>
            <div className="col-md-12">
            <p className="lead text-muted">Welcome {this.props.auth.name}</p>
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
    auth: state.authReducer.user
  }
}

export default connect(mapStateToProps, { getProfile, deleteProfile })(Dashboard);
