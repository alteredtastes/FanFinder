const express = require('express');
const router = express.Router();
const oauth = require('./oauth');
const napster = require('./napster');
const { verifyToken } = require('./utils/auth_utils.js');

router.get('/oauth', oauth.napster.entry);
router.get('/oauth/callback', oauth.napster.callback);

router.get('/napster/search_artists', verifyToken, napster.searchArtists);
router.post('/napster/get_releases', verifyToken, napster.getReleases);
router.get('/napster/get_fans', verifyToken, napster.getFans);

module.exports = router;
