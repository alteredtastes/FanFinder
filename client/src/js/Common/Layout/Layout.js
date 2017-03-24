import React, { Component } from 'react';
import { Nav } from '../Nav';
import './Layout.css';

class Layout extends Component {

  render() {
    return (
      <div className='Layout'>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

export { Layout };
