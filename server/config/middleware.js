const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const session = require('express-session');
const cookieParser = require('cookie-parser');

module.exports = (app, express, passport) => {
  
  // Enable React-Hot-Loader in development using webpack middleware
  if (process.env.NODE_ENV = 'development') {

    // Packages required for React-Hot-Loader as follows:
    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.config.js');
    const webpackCompiler = webpack(webpackConfig);
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    app.use(webpackDevMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        'colors': true,
        'chunks': false, // Reduces junk seen in terminal;
        'errors-only': true
      }
    }));
    app.use(webpackHotMiddleware(webpackCompiler, {}));

  }

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../', 'dist')));
  app.use(favicon(path.join(__dirname, '../../', 'dist', 'images', 'icons', 'favicon', 'favicon.ico')));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
  });

  app.use(cookieParser());
  app.use(session({
    secret: 'thisIsMySuperSecretKey',
    resave: true,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // The '/scripts' endpoint below serves up 'node_modules' buried in the
  // root directory which is inaccessible by index.html from /client
  // See article:
  // http://stackoverflow.com/questions/27464168/how-to-include-scripts-located-inside-the-node-modules-folder
  app.use('/scripts', express.static(__dirname + '/../../node_modules'));
}