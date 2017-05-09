const request = require('../req_util');

const getReleases = (req, res, next) => {
  const token = req.user.napsterToken;
  const releases = req.body;
  const formattedReleases = {};

  const getReleaseImages = (id) => {
    return fetch(request('releaseImages', { id }, {}, token, 'GET'))
      .then(resp => resp.json())
  };

  const getReleaseMetadata = (id) => {
    return fetch(request('releaseMetadata', { id }, {}, token, 'GET'))
      .then(resp => resp.json())
  };

  const fetchReleasesImages = (releases) => {
    const promises = {};
    const imagePromises = {};
    const images = {};

    for (let key in releases) {
      promises[key] = releases[key].map(id => {
        return getReleaseImages(id);
      });
    }

    for (let key in promises) {
      Promise.all(promises[key])
        .then(arr => {
          images[key] = arr;
        });
    }

    console.log(images.main);

    return { releases, images };
  };

  const fetchReleasesMetadata = ({ releases, images }) => {
    images.main.then(arr => console.log(arr[0]))
    const metadataPromises = {};
    for (let key in releases) {
      metadataPromises[key] = Promise.all(releases[key].map(id => {
        return getReleaseMetadata(id);
      }));
    }

    return { releases, imagePromises, metadataPromises };
  }

  const formatResponse = ({ releases, imagePromises, metadataPromises }) => {
    for (let key in releases) {
      imagePromises[key].then(imagesPerRelease => {
        metadataPromises[key].then(metadataPerRelease => {
          console.log(imagesPerRelease)
        });
      });
    }

    return releases;
  }


  fetchReleasesImages(releases)
  .then(fetchReleasesMetadata)
  .then(formatResponse)
  .then(releases => res.json({ releases }));
};

module.exports = getReleases;
