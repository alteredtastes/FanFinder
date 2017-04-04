const jwt = require('jsonwebtoken');

const createJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '10m'
  });
};

module.exports = { createJwt };
