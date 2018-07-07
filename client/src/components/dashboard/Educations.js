import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import swal from 'sweetalert';

import { deleteEducation } from '../../actions/profileActions';

class Educations extends Component {

    delete(eduId) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.deleteEducation(eduId);

                    swal("This data has been deleted successfully!", {
                        icon: "success",
                    });
                }
            });
    }

    render() {

        if (_.isEmpty(this.props.educations))
            return <div></div>

        const exps = this.props.educations.map((education, index) => (
            <tr key={index}>
                <td>{education.school}</td>
                <td>{education.degree}</td>
                <td>{education.field}</td>
                <td>
                    {moment(education.from).format("MMM Do YY")} - {education.to === null ? 'Now' : moment(education.to).format("MMM Do YY")}
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => this.delete(education._id)}>
                        Delete
                  </button>
                </td>
            </tr>
        ));

        return (
            <div>
                <h4 className="mb-2">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Field</th>
                            <th>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {exps}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default connect(null, { deleteEducation })(Educations);