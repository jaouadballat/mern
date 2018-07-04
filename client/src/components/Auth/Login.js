import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loginUser } from '../../actions/userAction';
import TextField from '../utils/TextField';

class Login extends Component {

  state = {
    user: {
      email: "",
      password: ""
    },
    errors: {}
  }

  onChange = (e) => {
    const { user } = this.state;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state.user);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.errors)) {
      this.setState({errors: nextProps.errors.errors.errors});
    }
      if (nextProps.auth.isAuth) {
        nextProps.history.push('/dashboard')
      }
  }

  
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>

              <TextField
                type="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                error={this.state.errors.email}
                onChange={this.onChange}
              />

              <TextField
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                error={this.state.errors.password}
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
    errors: state.errorsReducer,
    auth: state.authReducer
  }
}

export default connect(mapStateToProps, { loginUser })(Login);
