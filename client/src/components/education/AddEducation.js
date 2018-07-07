import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import TextField from '../utils/TextField';
import TextAreaField from '../utils/TextAreaField';
import CheckboxField from '../utils/CheckboxField';
import { addEducation } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorsAction';

class AddEducation extends Component {

    state = {
        education: {
            current: false,
            school: "",
            degree: "",
            field: "",
            from: "",
            to: "",
            description: ""
        },
        errors: {}
    }

    onChange = (e) => {
        let { education } = this.state;
        education[e.target.name] = e.target.value;
        this.setState({ education })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addEducation(this.state.education);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.errors)) {
            this.setState({ errors: nextProps.errors.errors })
        }
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {

        return (
            <div className="section add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Your Education</h1>
                            <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextField
                                    type="text"
                                    placeholder="*School or Bootcamp"
                                    name="school"
                                    error={this.state.errors.school}
                                    onChange={this.onChange}
                                />

                                <TextField
                                    type="text"
                                    placeholder="* Degree or Certificate"
                                    name="degree"
                                    error={this.state.errors.degree}
                                    onChange={this.onChange}
                                />

                                <TextField
                                    type="text"
                                    placeholder="Field of study"
                                    name="field"
                                    error={this.state.errors.field}
                                    onChange={this.onChange}
                                />

                                <h6>From Date</h6>
                                <TextField
                                    type="date"
                                    name="from"
                                    placeholder=""
                                    error=""
                                    onChange={this.onChange}
                                />

                                <h6>To Date</h6>
                                <TextField
                                    type="date"
                                    name="to"
                                    placeholder=""
                                    error=""
                                    disabled={this.state.current}
                                    onChange={this.onChange}
                                />

                                <CheckboxField
                                    onClick={() => this.setState({ current: !this.state.education.current })}
                                    label="Current Job"
                                    name="current"
                                />

                                <TextAreaField
                                    placeholder="Job Description"
                                    name="description"
                                    info="Some of your responsabilities, etc"
                                    onChange={this.onChange}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errorsReducer.errors
    }
}

export default connect(mapStateToProps, { addEducation, clearErrors })(AddEducation);
