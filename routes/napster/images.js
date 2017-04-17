const images = (req, res, next) => {
  // res.json({ imageUrl: 'got here'});
  // const request = createRequest(req, req.user.napsterToken);

  fetch(request)
  .then(resp => resp.json())
  .then(({ images }) => {
    res.json({
      imageUrl: images[0].url
    });
  });
}

module.exports = images;
