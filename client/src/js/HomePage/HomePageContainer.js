import React, { Component } from 'react';
// import { store } from '../Utils/Store';
import { HomePage } from './';

const grabNames = ({ data }) => {
  console.log(data[0])
  const names = data.map(item => {
    return item.name
  });

  return { data, names };
}

const getImages = ({ data, names }) => {
  const ids = data.map(item => {
    return item.id
  });

  const fetches = ids.map(id => {
    return fetch(`/api/napster/images?artistId=${id}`, { credentials: 'include' })
      .then(resp => resp.json())
      .then(res => {
        return res.imageUrl
      });
  });

  const promises = Promise.all(fetches);
  return { promises, names };
}

const formElements = ({ promises, names }) => {
  promises.then(urls => console.log(urls));
  // return names.map(name => {
  //   return (
  //     <p>
  //       {name}
  //     </p>
  //   );
  // });
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
    fetch(`/api/napster/search?limit=10&type=artist&q=${query}`, { credentials: 'include' })
    .then(resp => resp.json())
    .then(grabNames)
    .then(getImages)
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
