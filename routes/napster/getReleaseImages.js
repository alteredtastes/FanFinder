const request = require('../req_util');

const getReleaseImages = (req, res, next) => {
  const token = req.user.napsterToken;
  const releases = req.body;
  const formattedReleases = {};
  const releaseIds = releases.albums
    .concat(releases.compilations)
    .concat(releases.singlesAndEPs);

  const fetchImages = (ids) => {
    return ids.map(id => {
      const params = { id };
      const queries = {};

      return fetch(request('albumImages', params, queries, token, 'GET'))
        .then(resp => resp.json())
        .then(res => res);
    });
  }

  const formatReleases = (imageResponses) => {
    const choseImages = imageResponses.map({ imagesByRelease } => {
      releaseIds.map(releaseId => {
        if (releaseId === imagesByRelease.contentId) {
          return
        }
      })
      if (imagesByRelease.contentId === )
    })
  }

  for (let key in releases) {
    formattedReleases[key] = {};
    releases[key].forEach((id) => {
      formattedReleases[key][id] = '';
    });
  }

  Promise.all(fetchImages(releaseIds))
  .then(formatReleases)
};

module.exports = getReleaseImages;
