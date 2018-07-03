import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { currentUser } from '../../actions/userAction';

export default function (ComponentClass) {

    class Auth extends Component {

        componentWillMount() {
            this.props.currentUser();
        }

        // state = {
        //     loading : true
        // }
        
        // componentWillReceiveProps() {
        //     this.setState({loading: false})
        // }

        
        render() {
            console.log(this.props.auth);
            if(this.props.auth.isAuth)
            return (
                this.props.auth.isAuth === true ?
                    <ComponentClass {...this.props} />
                    :
                    <Redirect to="/login" />
            ) 
            else 
            return <div>waiting</div>
            // console.log(this.state.loading);
            // if(!this.state.loading)
            // return (
            //     this.props.auth.isAuth === true ? 
            //         <ComponentClass {...this.props} /> 
            //         : 
            //         <Redirect to="/login" />
            // );
            // else{
            //     return null;
            // }
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.authReducer,
            error: state.errorsReducer
        }
    }

return connect(mapStateToProps, { currentUser })(Auth);
}
