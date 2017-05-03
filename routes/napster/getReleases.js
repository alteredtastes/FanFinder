const request = require('../req_util');

const getReleases = (req, res, next) => {
  const token = req.user.napsterToken;
  const releases = req.body;
  const formattedReleases = {};
  const releaseIds = releases.main
    .concat(releases.compilations)
    .concat(releases.singlesAndEPs);

  const fetchImages = (releaseIds) => {
    const promises = Promise.all(releaseIds.map(id => {
        const params = { id };
        const queries = {};

        return fetch(request('albumImages', params, queries, token, 'GET'))
          .then(resp => resp.json())
          .then(res => res)
      }));
    return { promises, releaseIds }
  }

  const fetchReleasesMetadata = ({ promises, releaseIds }) => {
    promises.then(imageResponses => {
      console.log('got here')
    })
    // return releaseIds.map(id => {
    //   const params = { id };
    //   const queries = {};
    //
    //   return fetch(request('artistReleases', params, queries, token, 'GET'))
    //     .then(resp => resp.json())
    //     .then(res => res);
    // });
  }

  const formatReleases = (imageResponses) => {
    imageResponses.forEach(({ images }) => {
      let img = images[0];
      let hasKey = img.hasOwnProperty('contentId');
      for (let key in releases) {
        if (!formattedReleases[key]) formattedReleases[key] = [];
        releases[key].forEach((id) => {
          if (hasKey && img.contentId === id) {
            formattedReleases[key].push({ id, images });
          }
        });
      }
    });
    return formattedReleases;
  }

  Promise.all(fetchImages(releaseIds))
  .then(fetchReleasesMetadata)
  .then(formatReleases)
  .then(releases => res.json({ releases }));
};

module.exports = getReleases;