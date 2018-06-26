import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Landing from './components/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';

class App extends Component {
  render() {
    return (
        <Layout> 
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Landing} />
          </Switch>
        </Layout>
    );
  }
}

export default App;
