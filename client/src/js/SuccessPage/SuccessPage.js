import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './SuccessPage.css';

class SuccessPage extends Component {
  constructor() {
    super()
    this.state = {
      fetchWithCookie: this.fetchWithCookie.bind(this)
    }
  }

  fetchWithCookie() {
    fetch('/api/logger', { credentials: 'include' })
    .then(resp => resp.json())
    .then(res => console.log(res));
  }

  render() {
    return(
      <div>
        <p className='Success'>
          Success Page
        </p>
        <p>
          Napster Login Succeeded!
        </p>
        <Button onClick={this.state.fetchWithCookie}>
          Test Cookies
        </Button>
      </div>
    );
  }
}

export { SuccessPage };
