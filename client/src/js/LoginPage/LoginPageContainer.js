import React, { Component } from 'react';
import { LoginPage } from './';

class LoginPageContainer extends Component {
  constructor() {
    super();
    this.state = {
      oauth: '/api/oauth?state=home'
    }
  }

  render() {
    return(
      <LoginPage {...this.state} />
    );
  }
}

export { LoginPageContainer };
