import React, { Component } from 'react';
import { connect } from 'react-redux';

import userRegister from '../../actions/registerAction';

class Login extends Component {

    state = {
        user: {
            name: "",
            email: "",
            password: "",
            password2: "",
        },
        errors: {}
    }

    onChange = (e) => {
        let { user } = this.state;
        user[e.target.name] = e.target.value;
        this.setState({ user });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.userRegister(this.state.user);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors.errors) {
            this.setState({errors: nextProps.errors.errors})
        }
    }


    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`form-control form-control-lg ${this.state.errors.name ? "is-invalid" : ""}`} placeholder="Name" name="name" value={this.state.name} 
                                    onChange={this.onChange} />
                                    {this.state.errors.name ? <div className="invalid-feedback">{this.state.errors.name}</div> : ""}
                                </div>
                                <div className="form-group">
                                    <input type="email" className={`form-control form-control-lg ${this.state.errors.email ? "is-invalid" : ""}`} placeholder="Email Address" name="email" value={this.state.email} 
                                    onChange={this.onChange} />
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                    {this.state.errors.email ? <div className="invalid-feedback">{this.state.errors.email}</div> : ""}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={`form-control form-control-lg ${this.state.errors.password ? "is-invalid" : ""}`} placeholder="Password" name="password" value={this.state.password} 
                                    onChange={this.onChange} />
                                    {this.state.errors.password ? <div className="invalid-feedback">{this.state.errors.password}</div> : ""}
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={this.state.password2} 
                                    onChange={this.onChange} />
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
        auth: state.authReducer,
        errors: state.errorsReducer
    }
}

export default connect(mapStateToProps, {userRegister})(Login);
