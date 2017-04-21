const request = require('../req_util');

const getAlbumsByArtist = (req, res, next) => {
  const params = { id: req.query.artistId };
  const queries = {};
  const token = req.user.napsterToken;

  const getAlbumImages = preformatted => {
    preformatted.promises = Promise.all(preformatted.albums.map((item) => {
      const params = { id: item.id };
      const queries = { limit: '3' };

      console.log(params);
    }))
  }

  fetch(request('getAlbumsByArtist', params, queries, token))
  .then(resp => resp.json())
  .then(getAlbumImages)
  .then(formatAlbums)
  .then(albums => res.json({ albums }));
};

module.exports = getAlbumsByArtist;
