const createRequest = (req, token) => {
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const options = { method: 'GET', headers };
  const uri = [
    `https://api.napster.com/v2.1/search?`,
    `q=${req.query.q}&`,
    `type=${req.query.type}&`,
    `limit=${req.query.limit}`
  ].join('');
  return new Request(uri, options);
}

const search = (req, res, next) => {
  const request = createRequest(req, req.user.napsterToken);
  
  fetch(request)
  .then(resp => resp.json())
  .then(({ data }) => {
    res.json({
      data
    });
  });
};

module.exports = search;
