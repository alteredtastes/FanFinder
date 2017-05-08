const request = require('../req_util');

const getReleases = (req, res, next) => {
  const token = req.user.napsterToken;
  const releases = req.body;
  const formattedReleases = {};

  const getReleaseImages = (id) => {
    return fetch(request('releaseImages', { id }, {}, token, 'GET'))
      .then(resp => resp.json())
      .then(res => res)
  };

  const getReleaseMetadata = (id) => {
    return fetch(request('releaseMetadata', { id }, {}, token, 'GET'))
      .then(resp => resp.json())
      .then(res => res)
  };

  const fetchReleasesImages = (releases) => {
    return () => {
      const imagePromises = {};
      for (let key in releases) {
        imagePromises[key] = Promise.all(releases[key].map(id => {
          return getReleaseImages(id);
        }));
      };

      return { releases, imagePromises };
    }
  }

  const fetchReleasesMetadata = ({ releases, imagePromises }) => {
    imagePromises.main.then(rel => console.log(rel))
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


  new Promise(fetchReleasesImages(releases))
  .then(fetchReleasesMetadata)
  .then(formatResponse)
  .then(releases => res.json({ releases }));
};

module.exports = getReleases;
