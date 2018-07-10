import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/userAction';
import { clearProfile } from '../actions/profileActions';

class Navbar extends Component {

    authNavbar = () => (
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="profiles.html"> Developers</a>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/create-profile">
                        <img src={this.props.auth.user.avatar} style={{ 'height': "30px", "width": "30px", "borderRadius": "50%" }} alt="" />
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.logout}>Logout</a>
                </li>
            </ul>
        </div>
    );

    guessNavbar = () => (
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        </div>
    );

    logout = () => {
        this.props.logout();
        this.props.clearProfile();
    }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">DevConnector</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                    { this.props.auth.isAuth ? this.authNavbar() : this.guessNavbar() }

            </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps, { logout, clearProfile })(Navbar);
