const request = require('../req_util');

const getAlbumsByArtist = (req, res, next) => {
  const params = { id: req.query.artistId };
  const queries = {};
  const token = req.user.napsterToken;

  const getAlbumImages = preformatted => {
    preformatted.promises = Promise.all(preformatted.albums.map((item) => {
      const params = { id: item.id };
      const queries = { limit: '3' };

      return fetch(request('albumImages', params, queries, token, 'GET'))
      .then(resp => resp.json())
      .then(res => res)
    }));
    return preformatted;
  }

  const formatAlbums = ({ albums, promises }) => {
    return promises.then((imgs) => {
      return albums.map((entry, i) => {
        let fetchedImages = imgs[i].images;
        let images = fetchedImages.map(img => img.url);
        images = images.length < 1 ? ['/images/napster_logo.png'] : images;
        return {
          id: entry.id,
          name: entry.name,
          images
        };
      });
    });
  }

  fetch(request('getAlbumsByArtist', params, queries, token))
  .then(resp => resp.json())
  .then(getAlbumImages)
  .then(formatAlbums)
  .then(albums => res.json({ albums }));
};

module.exports = getAlbumsByArtist;
