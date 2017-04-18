import React, { Component } from 'react';
// import { store } from '../Utils/Store';
import { HomePage } from './';

const formElements = ({ artists }) => {
  return artists.map(artist => {
    return (
      <div>
        <p>
          {artist.name}
        </p>
        <img src={artist.images[0]} />
      </div>
    );
  });
}

class HomePageContainer extends Component {
  constructor() {
    super();
    this.state = {
      submitSearch: this.submitSearch.bind(this)
    }
  }

  submitSearch(e) {
    const query = e.target.value;
    if (!query.trim()) {
      return;
    }
    fetch(`/api/napster/search_artists?q=${query}`, { credentials: 'include' })
    .then(resp => resp.json())
    .then(formElements)
    .then(elements => {
      this.setState({ elements });
    });
  }

  render() {
    return(
      <HomePage {...this.state}/>
    );
  }
}

export { HomePageContainer };
