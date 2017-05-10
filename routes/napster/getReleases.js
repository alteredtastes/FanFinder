const request = require('../req_util');

const getReleases = (req, res, next) => {
  const token = req.user.napsterToken;
  const releases = req.body;
  const formattedReleases = {};

  const getReleaseImages = (id) => {
    return fetch(request('releaseImages', { id }, {}, token, 'GET'))
      .then(resp => resp.json())
      .then(res => res);
  };

  const getReleaseMetadata = (id) => {
    return fetch(request('releaseMetadata', { id }, {}, token, 'GET'))
      .then(resp => resp.json())
      .then(res => res);
  };

  const fetchReleasesImages = (releases) => {
    return new Promise((resolve) => {
      const imagePromises = {};

      for (let key in releases) {
        let promises = releases[key].map(id => {
          return getReleaseImages(id);
        });
        imagePromises[key] = Promise.all(promises);
      }

      resolve({ releases, imagePromises });
    });
  };

  const fetchReleasesMetadata = ({ releases, imagePromises }) => {
    const metadataPromises = {};

    for (let key in releases) {
      let promises = releases[key].map(id => {
        return getReleaseMetadata(id);
      });
      metadataPromises[key] = Promise.all(promises);
    }

    return { releases, imagePromises, metadataPromises };
  }

  const formatResponse = ({ releases, imagePromises, metadataPromises }) => {
    const formattedResponse = {};

    for (let key in releases) {
      imagePromises[key].then(imagesForRelease => {
        metadataPromises[key].then(releaseMetadata => {

          console.log(imagesForRelease[0])
          console.log(releaseMetadata[0])
          
        });
      });
    }

    return formattedReleases;
  }


  fetchReleasesImages(releases)
  .then(fetchReleasesMetadata)
  .then(formatResponse)
  .then(formattedReleases => res.json({ formattedReleases }));
};

module.exports = getReleases;
