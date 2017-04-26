const request = require('../req_util');

const getReleaseImages = (req, res, next) => {
  const token = req.user.napsterToken;
  const releases = req.body;
  const formattedReleases = {};
  const releaseIds = releases.albums
    .concat(releases.compilations)
    .concat(releases.singlesAndEPs);

  const fetchImages = (releaseIds) => {
    return releaseIds.map(releaseId => {
      const params = { releaseId };
      const queries = {};

      return fetch(request('albumImages', params, queries, token, 'GET'))
        .then(resp => resp.json())
        .then(res => res);
    });
  }

  const formatReleases = (imageResponses) => {
    imageResponses.forEach(({ releaseImages }) => {
      let img = releaseImages[0];
      let hasKey = img.hasOwnProperty('contentId');
      for (let key in releases) {
        formattedReleases[key] = {};
        releases[key].forEach((id) => {
          if (hasKey && img.contentId === id) {
            formattedReleases[key][id] = img;
          }
        });
      }
    });
    console.log(formattedReleases)
    return formattedReleases;
  }

  Promise.all(fetchImages(releaseIds))
  .then(formatReleases)
  .then(releases => res.json({ releases }));
};

module.exports = getReleaseImages;
