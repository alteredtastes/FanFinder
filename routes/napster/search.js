const search = (req, res, next) => {
  console.log('here is q: ', req.query.q);
};

module.exports = { search };
