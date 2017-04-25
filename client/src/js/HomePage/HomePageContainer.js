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
        <div key={artist.id} name={artist.id} onClick={this.getAlbumsByArtist}>
          <div className="artistImage">
            <Image src={artist.images[0]} />
            <h5 className="artistName">{artist.name.toUpperCase()}</h5>
          </div>
        </div>
      );
    });
  }

  getAlbumsByArtist = (e) => {
    const id = e.currentTarget.getAttribute('name');
    const body = this.state.artists[id].releases;
    fetch(`/api/napster/get_release_images?artistId=${id}`, {
      credentials: 'include',
      method: 'POST',
      body
    })
    .then()


    // fetch(`/api/napster/get_albums_by_artist?artistId=${id}`, { credentials: 'include' })
    // .then(albResp => ({ albResp, id }))
    // .then(this.formAlbumElements)
    // .then(albumElements => {
    //   this.setState({ albumElements });
    // });
  }

  formAlbumElements = ({ albResp, id }) => {
    albResp.json()
    .then(({ albums }) => {
      console.log(albums);
      // return albums.map(album => {
      //   return (
      //     <div key={album.id} name={album.id} /*onClick={this.getListenersByAlbum}*/>
      //     <div className="albumImage">
      //       <Image src={album.images[0]} />
      //       <h5 className="albumName">{album.name.toUpperCase()}</h5>
      //     </div>
      //   </div>
      //   );
      // });
    });
  }

  render() {
    return(
      <HomePage {...this.state}/>
    );
  }
}

export { HomePageContainer };
