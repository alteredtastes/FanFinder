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
    // metadataPromises.compilations.then(b => {
    //   console.log(b[0]['albums'][0].id)
    // });
    // imagePromises.compilations.then((a) => a[0]['images'][0].contentId);

    const async = async () => {
      
    }
    for (let key in releases) {
      let images = await imagePromises[key].then(imagesForAlbums => imagesForAlbums[0].images);
      let metadata = await metadataPromises[key].then(metadataForAlbums => metadataForAlbums[0].albums[0]);
      let id = metadata.id
      releases[key].push({ id, images, metadata });
    }

    console.log(releases)

    // return releases;
  }


  fetchReleasesImages(releases)
  .then(fetchReleasesMetadata)
  .then(formatResponse)
  .then(releases => res.json({ releases }));
};

module.exports = getReleases;
