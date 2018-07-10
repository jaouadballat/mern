import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import TextField from '../utils/TextField';
import SelectField from '../utils/SelectField';
import TextAreaField from '../utils/TextAreaField';
import TextFieldGroup from '../utils/TextFieldGroup';
import { createProfile, getProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorsAction';


 class CreateProfile extends Component {

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
    this.setState({profile});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createProfile(this.state.profile);
  }

  // componentWillMount() {
  //   this.props.getProfile()
  // }



  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors.errors});
    }   
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }


  toggleSocialNetwork = () => {
    if(this.state.showSocialNetwork) {
      return (
        <div>
          <TextFieldGroup
            placeholder="Facebook page URL"
            name="facebook"
            value={this.state.bio}
            onChange={this.onChange}
          />

          <TextFieldGroup
            placeholder="Twitter page URL"
            name="twitter"
            value={this.state.tweeter}
            onChange={this.onChange}
          />

          <TextFieldGroup
            placeholder="Instagram page URL"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
          />

          <TextFieldGroup
            placeholder="Linkedin page URL"
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
          />

          <TextFieldGroup
            placeholder="Youtube page URL"
            name="youtube"
            value={this.state.youtube}
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
                    <h1 className="display-4 text-center">Create Your Profile</h1>
                    <p className="lead text-center">Let's get some information to make your profile stand out</p>
                    <small className="d-block pb-3">* = required field</small>
                    <form onSubmit={this.onSubmit}>
                      <TextField
                        type="text"
                        placeholder="Profile handle"
                        name="handle"
                        value={this.state.handle}
                        error={this.state.errors.handle}
                        onChange={this.onChange}
                        info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                      />

                      <SelectField
                        name="status"
                        error={this.state.errors.status}
                        onChange={this.onChange}
                        info="Give us an idea of where you are at in your career"
                      />

                      <TextField
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={this.state.company}
                        error=""
                        onChange={this.onChange}
                        info="Could be your own company or one you work for"
                      />

                      <TextField
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={this.state.website}
                        error=""
                        onChange={this.onChange}
                        info="Could be your own or a company website"
                      />

                      <TextField
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={this.state.location}
                        error=""
                        onChange={this.onChange}
                        info="City & state suggested (eg. Boston, MA)"
                      />

                      <TextField
                        type="text"
                        placeholder="Skills"
                        name="skills"
                        value={this.state.skills}
                        error={this.state.errors.skills}
                        onChange={this.onChange}
                        info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                      />

                      <TextField
                        type="text"
                        placeholder="Github Username"
                        name="github"
                        value={this.state.githubUserName}
                        error=""
                        onChange={this.onChange}
                        info="If you want your latest repos and a Github link, include your username"
                      />
                      
                      <TextAreaField
                        placeholder="A short bio about yourself"
                        name="bio"
                        value={this.state.bio}
                        error=""
                        onChange={this.onChange}
                        info="Tell us a little about yourself"
                      />

                      <div className="mb-3">

                        <button type="button" className="btn btn-light"
                        onClick={() => this.setState({showSocialNetwork: !this.state.showSocialNetwork})}>
                          Add Social Network Links
                        </button>

                        <span className="text-muted">Optional</span>
                      </div>

                        { this.toggleSocialNetwork() }
                      <button className="btn btn-info btn-block" type="submit">Create Profile</button>
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

export default connect(mapStateToProps, { createProfile, clearErrors, getProfile })(CreateProfile);
