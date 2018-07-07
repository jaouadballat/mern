import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import swal from 'sweetalert';

import { deleteExperience } from '../../actions/profileActions';

 class Experiences extends Component {

   delete(expId) {
       //this.props.deleteExperience(expId);
       swal({
           title: "Are you sure?",
           text: "Once deleted, you will not be able to recover this data",
           icon: "warning",
           buttons: true,
           dangerMode: true,
       })
        .then((willDelete) => {
            if (willDelete) {
                this.props.deleteExperience(expId);
                
                swal("This data has been deleted successfully!", {
                    icon: "success",
                });
            }
        });
   }
   
  render() {

      if (_.isEmpty(this.props.experiences))
          return <div></div>

      const exps = this.props.experiences.map((experience, index) => (
          <tr key={index}>
              <td>{experience.company}</td>
              <td>{experience.title}</td>
              <td>
                  {moment(experience.from).format("MMM Do YY")} - {experience.to === null ? 'Now' : moment(experience.to).format("MMM Do YY")}
              </td>
              <td>
                  <button className="btn btn-danger" onClick={() => this.delete(experience._id)}>
                      Delete
                  </button>
              </td>
          </tr>
      ));

      return (
          <div>
              <h4 className="mb-2">Experience Credentials</h4>
              <table className="table">
                  <thead>
                      <tr>
                          <th>Company</th>
                          <th>Title</th>
                          <th>Years</th>
                          <th />
                      </tr>
                  </thead>
                  <tbody>
                      { exps }
                  </tbody>
              </table>
          </div>
      )
  }
}
export default connect(null, { deleteExperience })(Experiences);