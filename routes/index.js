const express = require('express');
const router = express.Router();
const oauth = require('./oauth');
const napster = require('./napster');
const { verifyToken } = require('./utils/auth_utils.js');

router.get('/oauth', oauth.napster.entry);
router.get('/oauth/callback', oauth.napster.callback);

router.get('/napster/search_artists', verifyToken, napster.searchArtists);
// router.get('/napster/get_albums_by_artist', verifyToken, napster.getAlbumsByArtist);
router.post('/napster/get_release_images', verifyToken, napster.getReleaseImages);

module.exports = router;
