const jwt = require('jsonwebtoken');

const createJwt = (payload) => {
  console.log('made it here');
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '10m'
  });
};

module.exports = { createJwt };
