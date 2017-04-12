const createRequest = (req, token) => {
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const options = { method: 'GET', headers };
  const uri = `https://api.napster.com/v2.1/artists/${req.query.artistId}/images`;

  return new Request(uri, options);
}

const images = (req, res, next) => {
  // res.json({ imageUrl: 'got here'});
  const request = createRequest(req, req.user.napsterToken);

  fetch(request)
  .then(resp => resp.json())
  .then(({ images }) => {
    res.json({
      imageUrl: images[0].url
    });
  });
}

module.exports = images;
