const request = require('../req_util');

const getReleaseImages = (req, res, next) => {
  const token = req.user.napsterToken;
  const releases = req.body;
  const formattedReleases = {};
  const releaseIds = releases.main
    .concat(releases.compilations)
    .concat(releases.singlesAndEPs);

  const fetchImages = (releaseIds) => {
    return releaseIds.map(id => {
      const params = { id };
      const queries = {};

      return fetch(request('albumImages', params, queries, token, 'GET'))
        .then(resp => resp.json())
        .then(res => res);
    });
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
  .then(formatReleases)
  .then(releases => res.json({ releases }));
};

module.exports = getReleaseImages;
