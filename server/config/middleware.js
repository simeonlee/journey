var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../dist'));

  // The '/scripts' endpoint below serves up 'node_modules' buried in the
  // root directory which is inaccessible by index.html from /client
  // See article:
  // http://stackoverflow.com/questions/27464168/how-to-include-scripts-located-inside-the-node-modules-folder
  app.use('/scripts', express.static(__dirname + '/../../node_modules'));
}