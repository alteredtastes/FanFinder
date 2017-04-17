const request = require('../req_util.js');

const search = (req, res, next) => {
  const params = {};
  const queries = req.query;
  const token = req.user.napsterToken;

  fetch(request('search', params, queries, token, 'GET'))
  .then(resp => resp.json())
  .then(({ data }) => {
    res.json({
      data
    });
  });
};

module.exports = search;
