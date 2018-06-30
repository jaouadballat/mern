import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Landing from '../components/Landing';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Dashboard from '../components/Dashboard';

export default () => {
    return (
        <div>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/" component={Landing} />
            </Switch>
        </div>
    )
}
