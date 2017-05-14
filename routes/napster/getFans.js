const request = require('../req_util');

const getFans = (req, res, next) => {
  const params = { releaseId: req.query.releaseId };
  const queries = { range: 'life' };
  const token = req.user.napsterToken;

  return fetch(request('fans', params, queries, token, 'GET'))
  .then(resp => resp.json())
  .then(({ listeners }) => {
    const fans = listeners;
    res.json({ fans });
  });
}

module.exports = getFans;
