var FacebookStrategy = require('passport-facebook').Strategy
var auth = require('../../auth.js');

module.exports = (passport) => {
  //configure passport strategies
  passport.use('facebook', new FacebookStrategy({
      clientID: auth.facebook.appID,
      clientSecret: auth.facebook.appSecret,
      callbackURL: auth.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        
        // At the moment, the facebook user's profile is returned.
        // TODO: instead return user information from DB.
        console.log('TEST');
        return done(null, profile);
      });
    }
  ));
}