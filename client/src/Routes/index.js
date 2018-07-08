import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Landing from '../components/Landing';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Dashboard from '../components/dashboard/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import CreateProfile from '../components/Profile/CreateProfile';
import EditProfile from '../components/Profile/EditProfile';
import Profiles from '../components/Profile/Profiles';
import Profile from '../components/Profile/Profile';
import Auth from '../components/HOC/Auth';
import AddExperience from '../components/experience/AddExperience';
import AddEducation from '../components/education/AddEducation';

export default () => {
    return (
        <div>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/create-profile" component={Auth(CreateProfile)} />
                <Route path="/edit-profile" component={Auth(EditProfile)} />
                <Route path="/profiles" component={Auth(Profiles)} />
                <Route path="/profile/:handle" component={Auth(Profile)} />
                <Route path="/add-experience" component={Auth(AddExperience)} />
                <Route path="/add-education" component={Auth(AddEducation)} />
                <Route path="/dashboard" component={Auth(Dashboard)} />
                <Route path="/" component={Landing} />
            </Switch>
        </div>
    )
}
