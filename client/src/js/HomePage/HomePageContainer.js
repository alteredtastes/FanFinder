import React, { Component } from 'react';
// import { store } from '../Utils/Store';
import { Image } from 'react-bootstrap';
import { HomePage } from './';

class HomePageContainer extends Component {
  constructor() {
    super();
    this.state = {
      submitSearch: this.submitSearch.bind(this),
      searchAlbums: this.searchAlbums.bind(this)
    }
  }

  searchAlbums = (e) => {
    console.log(this.props)
    console.log(e.currentTarget)
  }

  formArtistElements = ({ artists }) => {
    return artists.map(artist => {
      return (
        <div key={artist.id}>
          <div className="artistImage" name={artist.id} onClick={this.searchAlbums}>
            <Image src={artist.images[0]} />
            <h5 className="artistName">{artist.name.toUpperCase()}</h5>
          </div>
        </div>
      );
    });
  }

  submitSearch(e) {
    const query = e.target.value;
    if (!query.trim()) {
      return;
    }
    fetch(`/api/napster/search_artists?q=${query}`, { credentials: 'include' })
    .then(resp => resp.json())
    .then(this.formArtistElements)
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
