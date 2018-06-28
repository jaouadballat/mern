import React from 'react'


import Navbar from './Navbar';
import Footer from './Footer';

export default (props) => {
  return (
      <div>
        <Navbar />
          {props.children}
        <Footer />
      </div>
  )
}
