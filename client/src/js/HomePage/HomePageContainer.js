import React, { Component } from 'react';
// import { store } from '../Utils/Store';
import { Image } from 'react-bootstrap';
import { HomePage } from './';

class HomePageContainer extends Component {
  constructor() {
    super();
    this.state = {
      submitSearch: this.submitSearch.bind(this),
      getAlbumsByArtist: this.getAlbumsByArtist.bind(this)
    }
  }

  getAlbumsByArtist = (e) => {
    const query = e.currentTarget.getAttribute('name');
    fetch(`/api/napster/get_albums_by_artist?artistId=${query}`, { credentials: 'include' })
    .then(resp => resp.json())
    .then(res => {
      console.log('made it back to HomePageContainer')
    });
  }

  formArtistElements = ({ artists }) => {
    return artists.map(artist => {
      return (
        <div key={artist.id} name={artist.id} onClick={this.getAlbumsByArtist}>
          <div className="artistImage">
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
