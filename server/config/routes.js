var passport = require('passport');
var path = require('path');
var { checkForFacebookUser } = require('./utils');

module.exports = (app, db) => {

  //Serve up static files upon request.
  // app.get('/', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  // });

  app.get('/api/journal/:userId/:month/:day/:year', (req, res, next) => {
    db.User.getEntriesOnDate(req, res, next, req.params.userId, req.params.month, req.params.day, req.params.year);
  });

  app.post('/api/journal', (req, res, next) => {
    db.User.postEntry(req, res, next);
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
    console.log('logging out');
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
}
