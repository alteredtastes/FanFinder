const request = require('../req_util');

const searchArtists = (req, res, next) => {
  const params = {};
  const queries = { q: req.query.q, type: 'artist', limit: '10' };
  const token = req.user.napsterToken;

  const getArtistImages = preformatted => {
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
        return {
          images,
          id: entry.id,
          name: entry.name,
          releases: {
            main: entry.albumGroups.main,
            compilations: entry.albumGroups.compilations,
            singlesAndEPs: entry.albumGroups.singlesAndEPs
          }
        };
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
