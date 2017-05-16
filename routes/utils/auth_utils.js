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

const setCookieOptions = (token) => {
  const age = 60 * 1000; // must expire AFTER jwt does
  const options = {
    signed: true, // must also specify secret as array or string in app.js cookieParser()
    // httpOnly: true, // hides token from being read by most browser javasript
    maxAge: age // in milliseconds; if used, must be longer than jwt expiration
    // secure: true, // makes cookie only passable over https
    // expires: new Date(), // instead of maxAge
    // path: , // defaults to '/' , can verify user's calling state
    // domain: , // defaults to domain name of the app
    // sameSite: , // see express docs
    // encode: ,// see express docs
  };

  /*
  See note about authorized cookie in client/src/js/Utils/Auth
  If expiring the jwt cookie, send additional cookie with same expiration.
  res.cookie('isAuthorized', true, { maxAge: age });
  */

  return { token, options };
}

module.exports = {
  createToken,
  verifyToken,
  setCookieOptions
};
