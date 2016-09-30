var passport = require('passport');
var path = require('path');

module.exports = (app, express) => {

  //Serve up static files upon request.
  app.get('/journal', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });

  app.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });

  app.get('/profile', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });

  app.get('/auth/facebook',
    passport.authenticate('facebook')
  );

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/login'
    })
  );
}