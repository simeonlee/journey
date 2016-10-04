var passport = require('passport');

module.exports = function() {

  var checkForFacebookUser = (req, res) => {
    console.log('checking for user')
    console.log('AUTHENTICATED: ', req.isAuthenticated());
    res.send(req.isAuthenticated());
  }

  var findOrCreateFbUser = (User, FacebookUser, profile, done) => {
    User.findOrCreate({
      where: {
        username: profile.email
      },
      defaults: {
        password: '12345',
        email: profile.email,
        // phone: '716-472-9022',
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        age: 23,
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
    })

    FacebookUser.findOrCreate({
      where: {facebookID: profile.id},
      defaults: {
        facebookID: profile.id,
        userId: 1
      }
    }).spread((user, wasCreated) => {
      return done(null, user);
    });
  }

  return {
    checkForFacebookUser: checkForFacebookUser,
    findOrCreateFbUser: findOrCreateFbUser
  }
}()