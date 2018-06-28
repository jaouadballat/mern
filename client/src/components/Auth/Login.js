import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/userAction';

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
    if(nextProps.errors.errors) {
      this.setState({errors: nextProps.errors.errors.errors});
    }
    if(nextProps.auth.isAuth) {
      localStorage.setItem('token', nextProps.auth.user.token);
      nextProps.history.push('/dashboard');
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
                <div className="form-group">
                  <input type="email" className={`form-control form-control-lg ${this.state.errors.email ? "is-invalid" : ""}`} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                  {this.state.errors.email ? <div className="invalid-feedback">{this.state.errors.email}</div> : ""}
                </div>
                <div className="form-group">
                  <input type="password" className={`form-control form-control-lg ${this.state.errors.password ? "is-invalid" : ""}`} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                  {this.state.errors.password ? <div className="invalid-feedback">{this.state.errors.password}</div> : ""}
                </div>
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
