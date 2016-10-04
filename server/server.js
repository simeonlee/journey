var express = require('express');
var app = express();
var passport = require('passport');

// configure passport.
require('./config/passport.js')(passport);

// configure server with middleware.
require('./config/middleware.js')(app, express, passport);

// configure server with routing.

/* === connect database to server === */
var config = require('./db/config');
var sequelize = config.sequelize;
var controllers = require('./db/models/utilities/controllers')(sequelize, config.User);

require('./config/routes.js')(app, controllers);

/* === connect database to server === */
var { sequelize } = require('./db/config');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Database connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

//start listening to requests on port 3000.
app.listen(3000, () => {
  console.log('Listening on Port: 3000');
  sequelize.sync().then(function() {
    console.log('Synced with mySQL through Sequelize.');
  });
});

module.exports = app;