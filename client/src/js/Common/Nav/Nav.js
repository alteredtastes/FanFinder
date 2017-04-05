import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { Navbar } from 'react-bootstrap';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">
              NapRanks
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );
  }
}

export { Nav };
