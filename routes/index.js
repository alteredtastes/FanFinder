const express = require('express');
const router = express.Router();
const { napster } = require('./oauth');

router.get('/oauth', napster.entry);
router.get('/oauth/callback', napster.callback);

router.get('/logger', (req, res, next) => {
  const cookies = req.signedCookies;
  console.log(cookies.jwt);
  res.json(req.signedCookies);
});

module.exports = router;
