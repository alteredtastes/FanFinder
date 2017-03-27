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
  const state = req.query.state; // frontend path to transitionTo if auth success
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
    res.redirect(`${process.env.DEV_CLIENT}?authorized=false`);
  }
  const napsterSuccess = req.query.code;
  if (napsterSuccess) {
    const state = req.query.state;
    const tokenRequest = createRequest(req.query.code);
    fetch(tokenRequest)
    .then((resp) => resp.json())
    .then((auth) => {

      /*SAVE NAPSTER TOKENS TO DB HERE, THEN ENCODE AND
      SEND A JWT IN COOKIE. JWT PAYLOAD SHOULD HAVE A GUID FROM DB.*/

      const jwtCookieAge = 8000;
      const jwtOptions = {
        signed: true, // must also specify secret as array or string in app.js cookieParser()
        httpOnly: true, // hides token from being read by most browser javasript
        maxAge: jwtCookieAge // in milliseconds, must be longer than jwt expiration
        // secure: true, // makes cookie only passable over https
        // expires: new Date(), // instead of maxAge
        // path: , // defaults to '/' , can verify user's calling state
        // domain: , // defaults to domain name of the app
        // sameSite: , // see express docs
        // encode: ,// see express docs
      };

      /* See note about authorized cookie in client/src/js/Utils/Auth */
      res.cookie('isAuthorized', true, { maxAge: jwtCookieAge });
      res.cookie('jwt', auth.access_token, jwtOptions);
      res.redirect(`${process.env.DEV_CLIENT}?appState=${state}`);
    });
  }
}

module.exports = napster;
