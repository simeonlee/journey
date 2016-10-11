var express = require('express');
var app = express();
var passport = require('passport');
var { sequelize } = require('./db/config');
var port = 5000;

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Database connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

/* IF YOU ARE WORKING WITH THIS CODE BASE FOR THE FIRST TIME, TO SET UP DATA BASE
MAKE SURE YOU ADD 'JOURNEY' TO MY SQL DATABASE! THEN UNCOMMENT BELOW CODE TO FORCE
DATABASE UPDATE! RECOMMENT AFTER YOU USE 'GULP' ONCE. THEN RESTART YOUR SERVER 
AFTER RECOMMENTING BELOW CODE. */
// sequelize
//   .sync({ force: true })
//   .then(function(err) {
//     console.log('It worked!');
//   }, function (err) { 
//     console.log('An error occurred while creating the table:', err);
//   });

require('./config/passport.js')(passport); // Authentication
require('./config/middleware.js')(app, express, passport); // Middleware
require('./config/routes.js')(app); // Routes

// Runs Google Cloud NLP code to analyze user journal
require('./analytics/analytics')();

// Start server
app.listen(port, () => {
  console.log('Listening on Port: ' + port);
  sequelize.sync().then(function() {
    console.log('Synced with mySQL through Sequelize.');
  });
});

module.exports = app;