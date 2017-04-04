const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connect = require('camo').connect;

let database;
const uri = 'mongodb://localhost/data/napranks';
connect(uri).then(function(db){
  database = db;
  console.log('DATABASE HAS CONNECTED');
});

require('dotenv').config();
require('es6-promise').polyfill();
require('isomorphic-fetch');

const app = express();
const api = require('./routes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* TRY THIS NPM PACKAGE FOR COOKIES USING {secure:true}:
https://www.npmjs.com/package/express-force-ssl */
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

/* ROUTE TOKEN TO REACT ROUTER SUCCESS PAGE */
app.get('/*',(req, res) => {
  res.sendFile(path.join(__dirname + 'static/js/bundle.js'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
