const express = require('express');
const router = express.Router();
const auth = require('./oauth');
const napster = require('./napster');
const { verifyToken } = require('./utils/jwt.utility.js');

router.get('/oauth', auth.napster.entry);
router.get('/oauth/callback', auth.napster.callback);

router.get('/napster/search', verifyToken, napster.search);

module.exports = router;
