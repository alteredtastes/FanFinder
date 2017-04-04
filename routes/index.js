const express = require('express');
const router = express.Router();
const { napster } = require('./oauth');

router.get('/oauth', napster.entry);
router.get('/oauth/callback', napster.callback);

module.exports = router;
