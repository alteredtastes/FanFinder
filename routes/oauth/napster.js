const { createToken, setCookieOptions } = require('../utils/auth_utils');
const { User } = require('../../database/models');

const napster = {};

const createRequest = (authCode) => {
  const options = [
    'https://api.napster.com/oauth/access_token?',
    `client_id=${process.env.NAPSTER_KEY}&`,
    `client_secret=${process.env.NAPSTER_SECRET}&`,
    'response_type=code&',
    'grant_type=authorization_code&',
    'redirect_uri=http://localhost:3001/api/oauth/callback&',
    `code=${authCode}`
  ];
  return new Request(options.join(''), { method: 'POST' });
}

napster.entry = (req, res, next) => {
  const state = req.query.state; // frontend path to transition to if auth success
  const uri = [
    'https://api.napster.com/oauth/authorize?',
    `client_id=${process.env.NAPSTER_KEY}&`,
    `redirect_uri=${process.env.NAPSTER_CALLBACK}&`,
    'response_type=code&',
    `state=${state}`
  ];
  res.redirect(uri.join(''));
};

napster.callback = (req, res, next) => {
  const napsterErrored = req.query.error;
  if (napsterErrored) {
    res.status(404).send({ message: 'Napster unavailable. Retry?' });
    return;
  }

  const napsterSuccess = req.query.code;
  if (napsterSuccess) {
    const state = req.query.state;
    const tokenRequest = createRequest(req.query.code);
    fetch(tokenRequest)
    .then((resp) => resp.json())
    .then((auth) => {

      const napsterUser = User.create({
        napsterToken: auth.access_token
      });

      napsterUser.save()
      .then(createToken)
      .then(setCookieOptions)
      .then(({ token, options }) => {
        res.cookie('token', token, options);
        res.redirect(`${process.env.DEV_CLIENT}?appState=${state}`);
      });
    });
  }
}

module.exports = napster;
