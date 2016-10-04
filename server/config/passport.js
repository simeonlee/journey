var FacebookStrategy = require('passport-facebook').Strategy;
var AmazonStrategy = require('passport-amazon').Strategy;
var { facebook, amazon } = require('../../auth.js');
var db, {User, FacebookUser} = require('../db/config.js');
var utils, { findOrCreateFbUser } = require('./utils.js');

module.exports = (passport) => {
  //configure passport strategies
  passport.use(new FacebookStrategy({
      clientID: facebook.appID,
      clientSecret: facebook.appSecret,
      callbackURL: facebook.callbackUrl,
      profileFields: facebook.profileFields
    },
    function(accessToken, refreshToken, profile, done) {
      findOrCreateFbUser(User, FacebookUser, profile, done);
    }
  ));

  passport.use(new AmazonStrategy({
      clientID: amazon.appID,
      clientSecret: amazon.appSecret,
      callbackURL: amazon.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ amazonId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      // console.log(profile);
      process.nextTick(() => done(null, profile))
    }
  ));

  passport.serializeUser(function(user, done) {
    // console.log("USER =========> ", user);
    if (user.facebookID) {
      done(null, user.facebookID);
    } else if (user.provider === 'amazon') {
      console.log('AMAZON PROVIDER', user.id)
      done(null, user.id)
    }
  });

  passport.deserializeUser(function(id, done) {
    console.log('ID', id)
    FacebookUser.findOne({where: {facebookID: id}})
      .then((user) => {
        done(null, user);
      });
  });
}

/*
EXAMPLE PROFILE:
{ id: '10153900943292227',
  name: 'Connor Chevli',
  last_name: 'Chevli',
  first_name: 'Connor',
  email: 'connorch@buffalo.edu',
  gender: 'male',
  age_range: { min: 21 },
  link: 'https://www.facebook.com/app_scoped_user_id/10153900943292227/',
  picture:
   { data:
      { is_silhouette: false,
        url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13692749_10153717845727227_6808228327020457045_n.jpg?oh=488264acd7faba41028c87a106f5ff94&oe=58681CA1' } },
  locale: 'en_US',
  timezone: -7,
  updated_time: '2016-09-28T17:31:28+0000',
  verified: true }
*/


//-----------------------------------
// Uncomment below to populate the
// database with avocado dummy data
//-----------------------------------

