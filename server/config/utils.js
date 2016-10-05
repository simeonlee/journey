var passport = require('passport');

module.exports = function() {

  var checkForFacebookUser = (req, res) => {
    res.send(req.isAuthenticated());
  }

  var findOrCreateFbUser = (User, FacebookUser, profile, done) => {
    User.findOrCreate({
      where: {
        email: profile.email
      },
      defaults: {
        // password: '12345',
        email: profile.email,
        // phone: '716-472-9022',
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        age: profile.name.age_range,
        gender: profile.gender,
        // bio: ,
        // job: 'fulltime avocado',
        // industry: 'avacadoing',
        // employer: 'lettuce',
        wantsEmails: 1,
        wantsTexts: 0,
        lastLoginDate: Date.now(),
        createdAt: Date.now()
      }
    }).spread((user, created) => {
      console.log('user!!!!!', user);
      FacebookUser.findOrCreate({ where: { facebookID: profile.id },
        defaults: {
          facebookID: profile.id,
          userId: user.id
        }
      }).spread((user, created) => {
        return done(null, user);
      });
    })
  }

  var findOrCreateAmazonUser = (User, AmazonUser, profile, done) => {
    // User.findOrCreate({
    //   where: {
    //     username: profile.email
    //   },
    //   defaults: {
    //     password: '12345',
    //     email: profile.email,
    //     // phone: '716-472-9022',
    //     firstName: profile.name.givenName,
    //     lastName: profile.name.familyName,
    //     age: 23,
    //     gender: profile.gender,
    //     // bio: ,
    //     // job: 'fulltime avocado',
    //     // industry: 'avacadoing',
    //     // employer: 'lettuce',
    //     wantsEmails: 1,
    //     wantsTexts: 0,
    //     lastLoginDate: Date.now(),
    //     createdAt: Date.now()
    //   }
    // })
  }

  return {
    checkForFacebookUser: checkForFacebookUser,
    findOrCreateFbUser: findOrCreateFbUser,
    findOrCreateAmazonUser: findOrCreateAmazonUser
  }
}()