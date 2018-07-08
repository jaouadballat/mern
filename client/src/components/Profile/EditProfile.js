import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';


import TextField from '../utils/TextField';
import SelectField from '../utils/SelectField';
import TextAreaField from '../utils/TextAreaField';
import TextFieldGroup from '../utils/TextFieldGroup';
import { createProfile, getProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorsAction';


class EditProfile extends Component {

    state = {
        profile: {
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            bio: '',
            githubUserName: '',
            skills: '',
            youtube: '',
            facebook: '',
            instagram: '',
            tweeter: '',
            linkedin: '',
        },
        errors: {},
        showSocialNetwork: false
    }

    onChange = (e) => {
        let { profile } = this.state
        profile[e.target.name] = e.target.value;
        this.setState({ profile });
    }

    onSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state.profile)
        this.props.createProfile(this.state.profile);
    }

    componentWillMount() {
        this.props.getProfile()
    }



    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors.errors });
        }
        if (!_.isEmpty(nextProps.profile)) {
            const profile = {};
            profile.handle = !_.isEmpty(nextProps.profile.handle) ? nextProps.profile.handle : '';
            profile.status = !_.isEmpty(nextProps.profile.status) ? nextProps.profile.status : '';
            profile.website = !_.isEmpty(nextProps.profile.website) ? nextProps.profile.website : '';
            profile.company = !_.isEmpty(nextProps.profile.company) ? nextProps.profile.company : '';
            profile.location = !_.isEmpty(nextProps.profile.location) ? nextProps.profile.location : '';
            profile.githubUserName = !_.isEmpty(nextProps.profile.githubUserName) ? nextProps.profile.githubUserName : '';
            profile.bio = !_.isEmpty(nextProps.profile.bio) ? nextProps.profile.bio : '';

            if(!_.isEmpty(nextProps.profile.socials)) {

                profile.facebook = !_.isEmpty(nextProps.profile.socials.facebook) ? nextProps.profile.socials.facebook : '';
                profile.tweeter = !_.isEmpty(nextProps.profile.socials.tweeter) ? nextProps.profile.socials.tweeter : '';
                profile.instagram = !_.isEmpty(nextProps.profile.socials.instagram) ? nextProps.profile.socials.instagram : '';
                profile.linkedin = !_.isEmpty(nextProps.profile.socials.linkedin) ? nextProps.profile.socials.linkedin : '';
                profile.youtube = !_.isEmpty(nextProps.profile.socials.youtube) ? nextProps.profile.socials.youtube : '';
                profile.skills = !_.isEmpty(nextProps.profile.skills) ? nextProps.profile.skills.join() : ''
            
            }
            
            profile.skills = nextProps.profile.skills.join();
            this.setState({ profile });
        }

    }

    componentWillUnmount() {
        this.props.clearErrors();
    }


    toggleSocialNetwork = () => {
        if (this.state.showSocialNetwork) {
            return (
                <div>
                    <TextFieldGroup
                        placeholder="Facebook page URL"
                        name="facebook"
                        value={this.state.profile.facebook}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        placeholder="Twitter page URL"
                        name="twitter"
                        value={this.state.profile.tweeter}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        placeholder="Instagram page URL"
                        name="instagram"
                        value={this.state.profile.instagram}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        placeholder="Linkedin page URL"
                        name="linkedin"
                        value={this.state.profile.linkedin}
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        placeholder="Youtube page URL"
                        name="youtube"
                        value={this.state.profile.youtube}
                        onChange={this.onChange}
                    />
                </div>
            );
        }
    }




    render() {
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextField
                                    type="text"
                                    placeholder="Profile handle"
                                    name="handle"
                                    value={this.state.profile.handle}
                                    error={this.state.errors.handle}
                                    onChange={this.onChange}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                                />

                                <SelectField
                                    name="status"
                                    error={this.state.errors.status}
                                    onChange={this.onChange}
                                    value={this.state.profile.status}
                                    info="Give us an idea of where you are at in your career"
                                />

                                <TextField
                                    type="text"
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.profile.company}
                                    error=""
                                    onChange={this.onChange}
                                    info="Could be your own company or one you work for"
                                />

                                <TextField
                                    type="text"
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.profile.website}
                                    error=""
                                    onChange={this.onChange}
                                    info="Could be your own or a company website"
                                />

                                <TextField
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.profile.location}
                                    error=""
                                    onChange={this.onChange}
                                    info="City & state suggested (eg. Boston, MA)"
                                />

                                <TextField
                                    type="text"
                                    placeholder="Skills"
                                    name="skills"
                                    value={this.state.profile.skills}
                                    error={this.state.errors.skills}
                                    onChange={this.onChange}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                />

                                <TextField
                                    type="text"
                                    placeholder="Github Username"
                                    name="githubUserName"
                                    value={this.state.profile.githubUserName}
                                    error=""
                                    onChange={this.onChange}
                                    info="If you want your latest repos and a Github link, include your username"
                                />

                                <TextAreaField
                                    placeholder="A short bio about yourself"
                                    name="bio"
                                    value={this.state.profile.bio}
                                    error=""
                                    onChange={this.onChange}
                                    info="Tell us a little about yourself"
                                />

                                <div className="mb-3">
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.setState({ showSocialNetwork: !this.state.showSocialNetwork })}>
                                        Add Social Network Links
                                     </button>
                                    <span className="text-muted">Optional</span>
                                </div>

                                {this.toggleSocialNetwork()}

                                <button className="btn btn-info btn-block" type="submit">Update Profile</button>
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
        errors: state.errorsReducer.errors,
        profile: state.profileReducer.profile
    }
}

export default connect(mapStateToProps, { createProfile, clearErrors, getProfile })(EditProfile);
