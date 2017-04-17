const request = require('../req_util');

const images = (req, res, next) => {
  const params = { id: req.query.artistId };
  const queries = {};
  const token = req.user.napsterToken;

  fetch(request('artistImages', params, queries, token, 'GET'))
  .then(resp => resp.json())
  .then(({ images }) => {
    res.json({
      imageUrl: images[0].url
    });
  });
}

module.exports = images;
