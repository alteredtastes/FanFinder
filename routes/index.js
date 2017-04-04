const express = require('express');
const router = express.Router();
const auth = require('./oauth');
const napster = require('./napster');

router.get('/oauth', auth.napster.entry);
router.get('/oauth/callback', auth.napster.callback);

router.get('/napster/search', napster.search);

module.exports = router;
