var passport = require('passport');
var path = require('path');
var { checkForFacebookUser } = require('./utils');

module.exports = (app, controllers) => {

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

  app.get('/journal',
    (req, res) => {
      res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
    }
  );

  app.get('/dashboard',
    (req, res) => {
      res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
    }
  );

  app.get('/login',
    (req, res) => {
      res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
    }
  );

  app.get('/profile',
    (req, res) => {
      res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
    }
  );

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  // });

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
      successRedirect: 'http://localhost:3000/',
      failureRedirect: 'http://localhost:3000/login'
    })
  );
  
  app.get('/auth/amazon',
    passport.authenticate('amazon', { scope: ['profile'] })
  );

  // handle the callback after facebook has authenticated the user
  app.get('/auth/amazon/callback',
    passport.authenticate('amazon', {
      successRedirect: 'http://localhost:3000/',
      failureRedirect: 'http://localhost:3000/login'
    })
  );
}
