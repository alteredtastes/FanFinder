const { User } = require('../../database/models');

const search = (req, res, next) => {
  

  const query = req.query.q;
  const type = req.query.type;

  // fetch(`http://api.napster.com/v2.1/search?q=${query}&type=${type}`)
  res.json({
    message: `You searched for ${req.query.q}!`
  })
};

module.exports = search;
