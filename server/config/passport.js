var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../../auth.js');
var db, {U} = require('../db/models/config');

module.exports = (passport) => {
  //configure passport strategies
  passport.use(new FacebookStrategy({
      clientID: configAuth.facebook.appID,
      clientSecret: configAuth.facebook.appSecret,
      callbackURL: configAuth.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        
        // At the moment, the facebook user's profile is returned.
        // TODO: instead return user information from DB.
        console.log('TEST');

        // sequelize.query('SELECT * FROM `users`', {type: sequelize.QueryTypes.SELECT})
        //   .then((user) => {
        //     console.log('WE FOUND THE USERS!!!', user);
        //     if (user) {
        //       return done(null, user);
        //     } else {

        //     }
        //   })
        //   .catch((err) => {
        //     console.log('function called but got an error', err);
        //     return done(err);
        //   })

      });
    }
  ));
}