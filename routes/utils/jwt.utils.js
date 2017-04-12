const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');

const createToken = ({ _id }) => {
  return jwt.sign({ guid: _id }, process.env.JWT_SECRET, {
    expiresIn: '60s' // cookie must also be set to expire AFTER the jwt.
  });
};

const verifyToken = (req, res, next) => {
  var token = req.signedCookies.token || req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    res.status(403).send({ message: 'No token provided' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedJwt) => {
    if (err) {
      // console.log(err);
      res.status(403).send({ message: 'Token has expired' });
      return;
    }

    User.findOne({ _id: decodedJwt.guid })
    .then((user) => {
      req.user = user;
      next();
    });
  });
}

module.exports = {
  createToken,
  verifyToken
};
