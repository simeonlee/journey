var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../../auth.js');
var db, {User} = require('../db/config.js');
var utils = require('../db/utils.js');

module.exports = (passport) => {
  //configure passport strategies
  passport.use(new FacebookStrategy({
      clientID: configAuth.facebook.appID,
      clientSecret: configAuth.facebook.appSecret,
      callbackURL: configAuth.facebook.callbackUrl,
      profileFields: configAuth.facebook.profileFields
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile._json);
      // if user is already in DB.
        // redirect to home with that session stored.

      // if user is not in the DB.
        // prompt user to sign up.  
        // user will provide other info
          //username, password, etc.

      User.findOrCreate(
        {
          where: {username: profile._json.displayName},
          defaults: {
            username: profile._json.displayName,
            password: '',
            email: 'avocado@gmail.com',
            firstName: 'Connor',
            lastName: 'Chevli'
          }
        }
      ).spread((user, wasCreated) => {
        return done(null, user.id);
      });
      // User.findOrCreate({}, function(err, user) {
      //   if (err) { return done(err); }
      //   done(null, user);
      // });
    }
  ));

  passport.serializeUser(function(user, done) {
    console.log('IM SERIALIZING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('user', user);
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializing!!!');
    User.findOne({where: {id: id}})
    .then((user) => {
      console.log('user ========> ', user);
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
// uncomment below to populate
// database with avocado dummy data
//-----------------------------------

// User.findOrCreate({
//   where: {
//     username: 'avocado'
//   },
//   defaults: {
//     password: '12345',
//     email: 'avocado@gmail.com',
//     phone: '716-472-9022',
//     firstName: 'Chris',
//     lastName: 'Avocado',
//     age: 23,
//     gender: 'male',
//     bio: 'male',
//     job: 'fulltime avocado',
//     industry: 'avacadoing',
//     employer: 'lettuce',
//     wantsEmails: 0,
//     wantsTexts: 1,
//     lastLoginDate: Date.now(),
//     createdAt: Date.now()
//   }
// })
// .spread(function(user, created) {
//   console.log(user.get({
//     plain: true
//   }))
//   console.log(created)

//   /*
//     {
//       username: 'sdepold',
//       job: 'Technical Lead JavaScript',
//       id: 1,
//       createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
//       updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
//     }
//     created: true
//   */
// })