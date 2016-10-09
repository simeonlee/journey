var passport = require('passport');
var path = require('path');
var { checkForFacebookUser } = require('../db/controllers/auth');
var journal = require('../db/controllers/journal'); // Controller to save and retrieve journal entries
var analytics = require('../db/controllers/analytics');

module.exports = (app) => {

  app.get('/api/journal', (req, res) => {
    journal.getJournalEntriesForDate(req, res); // get journal entries for a particular date
    analytics.getAllUserJournalEntries(req, res);
  });

  app.post('/api/journal', (req, res) => {
    journal.postJournalEntriesForDate(req, res); // post journal entries for a particular date
  });

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

  app.get('/auth', checkForFacebookUser);

  app.get('/logout', (req, res) => { 
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/facebook',
    passport.authenticate('facebook')
  );

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: 'http://localhost:3000/journal',
      failureRedirect: 'http://localhost:3000/login'
    })
  );
  
  app.get('/auth/amazon',
    passport.authenticate('amazon', { scope: ['profile'] })
  );

  // handle the callback after facebook has authenticated the user
  app.get('/auth/amazon/callback',
    passport.authenticate('amazon', {
      successRedirect: 'http://localhost:3000/journal',
      failureRedirect: 'http://localhost:3000/login'
    })
  );
}