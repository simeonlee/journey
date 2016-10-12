var passport = require('passport');
var path = require('path');
var { checkForFacebookUser } = require('../db/controllers/auth');
var journal = require('../db/controllers/journal'); // Controller to save and retrieve journal entries
var analytics = require('../db/controllers/analytics');

module.exports = (app) => {

  app.get('/api/journal', (req, res) => {
    journal.getJournalEntriesForDate(req, res); // get journal entries for a particular date
  });

  app.post('/api/journal', (req, res) => {
    journal.postJournalEntriesForDate(req, res); // post journal entries for a particular date
  });

  app.get('/api/analytics', (req, res) => {
    analytics.retrieveTextAnalysis(req, res);
  });

  app.get('/api/cumulative-analytics', (req, res) => {
    analytics.retrieveAllTextAnalyses(req, res);
  });

  app.post('/api/analytics', (req, res) => {
    // POST request to '/api/analytics/' tells server to run analytics
    // on journal entries for days that we have not run analytics
    // yet (or for days where user has updated the journal entry)

    // We keep track of this by saving the day to analyze
    // in the 'daysToBeAnalyzed' object saved in the user table

    // We also throttle the api calls to once every 12 hours
    // by making sure we are at least 12 hours ahead of the
    // 'timeOfLastAnalysis' datetime saved in the user table

    analytics.analyzeDays(req, res); 
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