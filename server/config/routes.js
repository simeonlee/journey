var passport = require('passport');

module.exports = (app, express) => {
  app.post('/login/facebook',
    passport.authenticate('facebook', { successRedirect: '/login/facebook/callback',
                                        failureRedirect: '/dashboard' }),
    (req, res) => {
      console.log('POST REQ TO LOGIN/FACEBOOK!!!')
      res.send();
    }
  );

  // handle the callback after facebook has authenticated the user
  app.get('/login/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/home',
      failureRedirect : '/'
    })
  );
}