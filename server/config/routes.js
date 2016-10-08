var passport = require('passport');
var path = require('path');
var { checkForFacebookUser, signUpLocalUser } = require('./utils');

module.exports = (app, controllers) => {

/* Deprecated method for entries retrieval - will be deleted in next pull request
  app.get('/api/journal/:userId/:month/:day/:year', (req, res, next) => {
    controllers
      .UserController
      .getEntriesOnDate(
        req,
        res,
        next,
        req.params.userId,
        req.params.month,
        req.params.day,
        req.params.year );
  */

  //Serve up static files upon request.
  // app.get('/', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  // });

  app.get('/api/journal', (req, res) => {
    controllers.UserController.getJournalEntries(req, res);
  });

  app.post('/api/journal', (req, res) => {
    controllers.UserController.postJournalEntries(req, res);
  });

  app.get('/api/profile/:userId', (req, res, next) => {
    controllers.UserController.getUser(req, res, next, req.params.userId);
  });

  app.post('/api/profile', (req, res, next) => {
    controllers.UserController.updateUserInfo(req, res, next);
  });

  app.get('/journal', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });

  app.get('/api/profile/:userId', (req, res, next) => {
    controllers.UserController.getUser(req, res, next, req.params.userId);
  });

  app.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });

  app.get('/profile', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });

  app.get('/auth', checkForFacebookUser);

  app.post('/login',
    passport.authenticate('local', { successRedirect: '/journal',
                                     failureRedirect: '/',
                                     failureFlash: true})
  );

  app.post('/signup', (req, res) => {
    signUpLocalUser(req, res);
  });

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
      failureRedirect: 'http://localhost:3000/'
    })
  );
  
  app.get('/auth/amazon',
    passport.authenticate('amazon', { scope: ['profile'] })
  );

  // handle the callback after facebook has authenticated the user
  app.get('/auth/amazon/callback',
    passport.authenticate('amazon', {
      successRedirect: 'http://localhost:3000/journal',
      failureRedirect: 'http://localhost:3000/'
    })
  );
}
