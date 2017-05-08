import React, { Component } from 'react';
// import { store } from '../Utils/Store';
import { Image } from 'react-bootstrap';
import { HomePage } from './';

class HomePageContainer extends Component {
  constructor() {
    super();
    this.state = {
      submitSearch: this.submitSearch.bind(this),
      getReleasesByArtist: this.getReleasesByArtist.bind(this)
    }
  }

  submitSearch(e) {
    const query = e.target.value;
    if (!query.trim()) {
      return;
    }
    fetch(`/api/napster/search_artists?q=${query}`, { credentials: 'include' })
    .then(resp => resp.json())
    .then(this.storeArtists)
    .then(this.formArtistElements)
    .then(artistElements => {
      this.setState({ artistElements });
    });
  }

  storeArtists = ({ artists }) => {
    this.setState({ artists });
    return { artists };
  }

  formArtistElements = ({ artists }) => {
    return artists.map(artist => {
      return (
        <div key={artist.id} name={artist.id} onClick={this.getReleasesByArtist}>
          <div className="artistImage">
            <Image src={artist.images[0]} />
            <h5 className="artistName">{artist.name.toUpperCase()}</h5>
          </div>
        </div>
      );
    });
  }

  getReleasesByArtist = (e) => {
    const id = e.currentTarget.getAttribute('name');
    const releases = this.state.artists
      .map(artist => artist.id === id ? artist.releases : null)
      .filter(r => !!r)[0];
    const body = JSON.stringify(releases);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = { credentials: 'include', method: 'POST', headers, body };

    fetch(`/api/napster/get_releases?artistId=${id}`, options)
    .then(resp => ({ resp: resp.json(), id }))
    .then(this.storeReleases)
    .then(this.formAlbumElements)
    .then(albumElements => {
      this.setState({ albumElements });
    });
  }

  storeReleases = ({ resp, id }) => {
    return resp.then(({ releases }) => {
      this.state.artists.forEach(artist => {
        if (artist.id === id) {
          artist.releases = releases
        };
      });
      return { id, releases };
    })
  }

  formAlbumElements = ({ id, releases }) => {
    return releases.main.map(album => {
      return (
        <div key={album.id} name={album.id} /*onClick={this.getListenersByAlbum}*/>
        <div className="albumImage">
          <Image src={album.images[0].url} />
          {/* <h5 className="albumName">{album.name.toUpperCase()}</h5> */}
        </div>
      </div>
      );
    });
  }

  render() {
    return(
      <HomePage {...this.state}/>
    );
  }
}

export { HomePageContainer };
