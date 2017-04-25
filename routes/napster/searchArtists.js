const request = require('../req_util');

const searchArtists = (req, res, next) => {
  const params = {};
  const queries = { q: req.query.q, type: 'artist', limit: '10' };
  const token = req.user.napsterToken;

  const getArtistImages = preformatted => {
    console.log(preformatted.data[0].albumGroups)
    console.log(preformatted.data[0].links)
    preformatted.promises = Promise.all(preformatted.data.map((item) => {
      const params = { id: item.id };
      const queries = { limit: '3' };

      return fetch(request('artistImages', params, queries, token, 'GET'))
      .then(resp => resp.json())
      .then(res => res)
    }));
    return preformatted;
  }

  const formatArtists = ({ data, promises }) => {
    return promises.then((imgs) => {
      return data.map((entry, i) => {
        let fetchedImages = imgs[i].images;
        let images = fetchedImages.map(img => img.url);
        images = images.length < 1 ? ['/images/napster_logo.png'] : images;
        const artist = {};
        artist[entry.id] = {
          images,
          name: entry.name,
          releases: {
            albums: entry.main,
            compilations: entry.compilations,
            singlesAndEPs: entry.singlesAndEPs
          }
        };
        return artist;
      });
    });
  }

  fetch(request('search', params, queries, token, 'GET'))
  .then(resp => resp.json())
  .then(getArtistImages)
  .then(formatArtists)
  .then(artists => res.json({ artists }));
};

module.exports = searchArtists;
