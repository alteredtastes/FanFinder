const search = (req, res, next) => {
  res.json({
    message: `You searched for ${req.query.q}!`
  })
};

module.exports = { search };
