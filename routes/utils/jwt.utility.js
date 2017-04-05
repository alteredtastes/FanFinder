const jwt = require('jsonwebtoken');

const createToken = ({ _id }) => {
  return jwt.sign(_id, process.env.JWT_SECRET, {
    expiresIn: '5s' // cookie must also be set to expire AFTER the jwt.
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
      console.log(`JWT VERIFY ERROR: ${err}`);
      res.status(403).send({ message: 'Token has expired' });
    }
    req.verifiedJwt = decodedJwt;
    next();
  });
}

module.exports = {
  createToken,
  verifyToken
};
