import React, { Component } from 'react';
import { connect } from 'react-redux';

import { currentUser } from '../../actions/userAction';

export default function(ComponentClass) {

    class Auth extends Component {

        componentWillMount() {
            this.props.currentUser();
        }

       render() {
   
             return(
                 this.props.auth.isAuth ?
                <ComponentClass {...this.props} />
                :
                <div className="d-flex justify-content-center align-items-center">Waiting...</div>
            )
           
       }
    }


    function mapStateToProps(state) {
        return {
            auth : state.authReducer
        }
    }


    return connect(mapStateToProps, { currentUser })(Auth);
}