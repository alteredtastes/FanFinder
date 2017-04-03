import React, { Component } from 'react';
import cookie from 'react-cookie';
import { HomePage } from './';

class HomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oauth: '/api/oauth?state=success',
      _f: {
        logger: this.logger.bind(this)
      }
    }
  }

  logger(e) {
    const isAuthorized = cookie.load('isAuthorized');
    if(isAuthorized) {
      fetch('/api/logger', { credentials: 'include' })
      .then(resp => resp.json())
      .then(res => console.log(res));
    } else {
      console.log('client logged!');
    }
  }

  render() {
    return(
      <HomePage {...this.state} />
    );
  }
}

export { HomePageContainer };
