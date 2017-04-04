import React, { Component } from 'react';
import { store } from '../Utils/Store';
import { HomePage } from './';

class HomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _f: {
        fetchWithCookie: this.fetchWithCookie.bind(this),
        fetchData: this.fetchData.bind(this)
      }
    }
  }

  fetchWithCookie() {
    fetch('/api/logger', { credentials: 'include' })
    .then(resp => resp.json())
    .then(res => console.log(res));
  }

  fetchData() {
    fetch('/api/data', { credentials: 'include' })
    .then(resp => resp.json())
    .then(res => {
      store.dispatch({ type: 'Home_Action_1', payload: res.testData });
      store.getState()
    });
  }

  render() {
    return(
      <HomePage {...this.state}/>
    );
  }
}

export { HomePageContainer };
