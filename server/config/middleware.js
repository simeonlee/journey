var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var cookieParser = require('cookie-parser');

module.exports = (app, express, passport) => {
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../../', 'dist')));
  app.use(favicon(path.join(__dirname, '../../', 'dist', 'images', 'icons', 'favicon', 'favicon.ico')));

  app.use(cookieParser());
  app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
  }))
  app.use(passport.initialize());
  app.use(passport.session());

  // The '/scripts' endpoint below serves up 'node_modules' buried in the
  // root directory which is inaccessible by index.html from /client
  // See article:
  // http://stackoverflow.com/questions/27464168/how-to-include-scripts-located-inside-the-node-modules-folder
  app.use('/scripts', express.static(__dirname + '/../../node_modules'));
}