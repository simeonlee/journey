var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../../auth.js');
var db, {User} = require('../db/config.js');
var utils = require('../db/utils.js');

module.exports = (passport) => {
  //configure passport strategies
  passport.use(new FacebookStrategy({
      clientID: configAuth.facebook.appID,
      clientSecret: configAuth.facebook.appSecret,
      callbackURL: configAuth.facebook.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        
        // At the moment, the facebook user's profile is returned.
        // TODO: instead return user information from DB.
        console.log('TEST');
        // findOrcreate new user
        // return user from db.
        User.findOrCreate({
          where: {
            username: 'TESTING123'
          },
          defaults: {
            password: '12345',
            email: 'avocado@gmail.com',
            phone: '716-472-9022',
            firstName: 'Chris',
            lastName: 'Avocado',
            age: 23,
            gender: 'male',
            bio: 'male',
            job: 'fulltime avocado',
            industry: 'avacadoing',
            employer: 'lettuce',
            wantsEmails: 0,
            wantsTexts: 1,
            lastLoginDate: Date.now(),
            createdAt: Date.now()
          }
        })
        .spread(function(user, created) {
          // console.log(user.get({
          //   plain: true
          // }))
          console.log(created)

          /*
            {
              username: 'sdepold',
              job: 'Technical Lead JavaScript',
              id: 1,
              createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
              updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
            }
            created: true
          */

          passport.serializeUser(function(user, done) {
            done(null, user);
          });

          passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
              done(err, user);
            });
          });
        })
      });
    }
  ));
}


//--------
//uncomment below and push command b to populate database with avocado dummy data
//--------


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