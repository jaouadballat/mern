import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute =  ({component: Component, auth, ...rest}) => {
  return (
      <Route
          {...rest}
          render={props =>
              auth.isAuth ? (
                  <Component {...props} />
                     ) : (
                      <Redirect
                          to={{
                              pathname: "/login"
                          }}
                      />
                  )
          }
      />
  )
}

function mapStateToProps(state) {
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps)(PrivateRoute);
