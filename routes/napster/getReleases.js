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

    const getAsync = async o => {
      for (let key in releases) {
        const [images, metadata] = await Promise.all([
          o.imagePromises[key],
          o.metadataPromises[key]
        ]);

        releases[key].forEach((releaseId, i) => {
          releases[key][i] = {
            id: metadata[i].albums[0].id,
            metadata: metadata[i].albums[0],
            images: images[i].images
          }
        });
      }
      return releases;
    };

    return getAsync({ imagePromises, metadataPromises })
  }

  fetchReleasesImages(releases)
  .then(fetchReleasesMetadata)
  .then(formatResponse)
  .then(releases => res.json({ releases }));
};

module.exports = getReleases;
