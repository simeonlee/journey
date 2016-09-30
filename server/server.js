var express = require('express');

var app = express();

// declare models for database.

// configure server with middleware.
require('./config/middleware.js')(app, express);

// configure server with routing.

/* === connect database to server === */
var controllers = require('./db/config');
var sequelize = controllers.sequelize;

require('./config/routes.js')(app, controllers);

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