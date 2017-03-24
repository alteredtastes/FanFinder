import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './SuccessPage.css';

class SuccessPage extends Component {

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
        <Button onClick={this.fetchWithCookie.bind(this)}>
          Test Cookies
        </Button>
      </div>
    );
  }
}

export { SuccessPage };
