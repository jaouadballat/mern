import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Landing from '../components/Landing';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Dashboard from '../components/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import CreateProfile from '../components/Profile/CreateProfile';
import EditProfile from '../components/Profile/EditProfile';
import Auth from '../components/HOC/Auth';

export default () => {
    return (
        <div>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/create-profile" component={Auth(CreateProfile)} />
                <Route path="/edit-profile" component={Auth(EditProfile)} />
                <Route path="/dashboard" component={Auth(Dashboard)} />
                <Route path="/" component={Landing} />
            </Switch>
        </div>
    )
}
