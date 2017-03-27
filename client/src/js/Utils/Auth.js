import { Component } from 'react';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthorized: cookie.load('isAuthorized'),
      appState: this.props.location.query.appState
    }
  }

  componentWillMount() {
    if(this.state.isAuthorized) {
      browserHistory.push(this.state.appState);
    } else {
      console.log('login failed!');
      // create error route and catch-all
      // browserHistory.push('error');
    }
  }

    /* if user goes to index route with a valid jwt in the httpOnly cookie,
    then they should automatically transitionTo their authenticated page.
    Therefore, we must create 2 cookies - one that is the httpOnly
    with the jwt - and another that is javascript-readable via react
    and has identical expiration time to the httpOnly jwt cookie.
    ex. res.cookie('authorized', true, { maxAge: ${ageOfJWTCookie}}) */
    // const isAuthorized = cookie.load('isAuthorized');
    // const { state } = this.props.location.query;

      // jwt httpOnly cookie with same expire time is to determine logged in status

  render() {
    return(
      this.props.children
    )
  }
}

export { Auth };
