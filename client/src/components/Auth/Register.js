import React, { Component } from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/userAction';
import TextFieldGroup from '../utils/TextFieldGroup';

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
        this.props.registerUser(this.state.user);
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

                            <TextFieldGroup
                                type="text"
                                placeholder="Name"
                                value={this.state.name}
                                error={this.state.errors.name}
                                name="name"
                                onChange={this.onChange}
                            />

                            <TextFieldGroup
                                type="email"
                                placeholder="Email"
                                value={this.state.email}
                                error={this.state.errors.email}
                                name="email"
                                onChange={this.onChange}
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                            />

                            <TextFieldGroup
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                error={this.state.errors.password}
                                name="password"
                                onChange={this.onChange}
                            />

                            <TextFieldGroup
                                type="password"
                                placeholder="Confirm Password"
                                value={this.state.password2}
                                name="password2"
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
        auth: state.authReducer,
        errors: state.errorsReducer
    }
}

export default connect(mapStateToProps, { registerUser })(Login);
