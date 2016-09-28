var passport = require('passport');

module.exports = (app, express) => {

  app.get('/auth/facebook',
    passport.authenticate('facebook', {scope: ['email']}),
    (req, res) => {
      console.log('POST REQ TO LOGIN/FACEBOOK!!!')
      res.send();
    }
  );

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/login'
    })
  );
}