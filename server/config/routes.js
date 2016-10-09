var passport = require('passport');
var path = require('path');
var { checkForFacebookUser, signUpLocalUser, logoutAndRememberUser, linkAlexa, storeAlexaData} = require('./utils');
var journal = require('../db/controllers/journal'); // Controller to save and retrieve journal entries

module.exports = (app) => {

  app.get('/api/journal', (req, res) => {
    journal.getJournalEntriesForDate(req, res); // get journal entries for a particular date
  });

  app.post('/api/journal', (req, res) => {
    journal.postJournalEntriesForDate(req, res); // post journal entries for a particular date
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

  app.get('/linkToAmazon', (req, res) => {
    logoutAndRememberUser(req, res);
  });
  
  app.get('/linkToFacebook', (req, res) => {
    logoutAndRememberUser(req, res);
  });

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

  // handle the callback after amazon has authenticated the user
  app.get('/auth/amazon/callback', 
    passport.authenticate('amazon', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/profile');
    }
  );
  
  app.post('/token', (req, res) => {
    // console.log('REQUEST BODY =======>', req.body);
    linkAlexa(req, res);
  });
  
  app.post('/alexaPost', (req, res) => {
    //alexa id, message, and show what prompt it's on.
    storeAlexaData(req, res)
  });
  
}

/*

Morning:
1.  first grateful
2. second grateful
3. third grateful
4. first what would make today great
5. second "
6. third "
7. affirmations

evening:
1. first amazing thing that happened today
2. second "
3 third "
4 how you could have made today better
{
  userId: 'AEBL3VDQN47YRMF6A7OUL2HKBMAUBW3MJ7RRWL3YTYPHDFITSPYHGEHUOXJW5AL3ROPAESWURA6H5OUP3UOPF6MHNDGO5EPEDWZKGIG2Q4XPRTHSLGIKEDKU4QDVI6IWGIUH6YTE6ITOJRFG36ANDUFKPRWSA6UUZJTYA4WOCT2I7Y74DEYMGKYIN6HRAJXEAIC2UKGESOCMSIQ',
  entryType: 'morning', // or evening or general
  prompt: 4,
  text: 'I\'m grateful for last night\'s shenanigans'
}
*/