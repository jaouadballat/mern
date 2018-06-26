import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

export default (props) => {
  return (
    <Router>
      <div>
        <Navbar />
        {props.children}
        <Footer />
      </div>
    </Router>
  )
}
