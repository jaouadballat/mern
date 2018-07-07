import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import TextField from '../utils/TextField';
import TextAreaField from '../utils/TextAreaField';
import CheckboxField from '../utils/CheckboxField';
import { addExperience } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorsAction';

 class AddExperience extends Component {

    state = {
       experience: {
           current: false,
           title: "",
           company: "",
           location: "",
           from: "",
           to: "",
           description: ""
       },
       errors:{}
    }

    onChange = (e) => {
        let {experience} = this.state;
        experience[e.target.name] =  e.target.value;
        this.setState({ experience })
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.addExperience(this.state.experience);
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isEmpty(nextProps.errors)) {
            this.setState({errors: nextProps.errors.errors})
        }
    }
    
    componentWillUnmount() {
        this.props.clearErrors();
    }

  render() {

    return (  
    <div className="section add-experience">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                        Go Back
                    </Link>
                    <h1 className="display-4 text-center">Add Your Experience</h1>
                    <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
                    <small className="d-block pb-3">* = required field</small>
                    <form onSubmit={this.onSubmit}>
                            <TextField
                                type="text"
                                placeholder="*Job Title"
                                name="title"
                                error={this.state.errors.title}
                                onChange={this.onChange}
                            />

                            <TextField 
                                type="text"
                                placeholder="* Company"
                                name="company"
                                error={this.state.errors.company}
                                onChange={this.onChange}
                            />

                            <TextField
                                type="text"
                                placeholder="Location"
                                name="location"
                                error={this.state.errors.location}
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
                                onClick={() => this.setState({ current: !this.state.experience.current })}
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

export default connect(mapStateToProps, { addExperience, clearErrors })(AddExperience);
