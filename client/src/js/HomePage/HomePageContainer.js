import React, { Component } from 'react';
import { HomePage } from './';

class HomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oauth: '/api/oauth?state=success',
      apiMessage: '',
      _f: {
        logger: this.logger.bind(this)
      }
    }
  }

  logger(e) {
    console.log(`You clicked ${e.currentTarget.name}`);
  }

  render() {
    return(
      <HomePage {...this.state} />
    );
  }
}

export { HomePageContainer };
