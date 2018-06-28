import React, { Component } from 'react';

import Routes from './Routes';
import Layout from './components/Layout';

import './App.css';

class App extends Component {
  render() {
    return (
        <Layout> 
          <Routes />
        </Layout>
    );
  }
}

export default App;
