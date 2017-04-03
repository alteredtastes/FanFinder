const express = require('express');
const router = express.Router();
const { napster } = require('./oauth');

router.get('/oauth', napster.entry);
router.get('/oauth/callback', napster.callback);

router.get('/logger', (req, res, next) => {
  const jwt = req.signedCookies.jwt;
  console.log(jwt);
  res.json({
    message: jwt ? 'to redux!' : 'cookie expired!'
  });
});

router.get('/data', (req, res, next) => {
  const jwt = req.signedCookies.jwt;
  console.log(jwt);
  res.json({
    testData: jwt ? 'this is some DATA!' : 'cookie expired!'
  });
});

module.exports = router;
