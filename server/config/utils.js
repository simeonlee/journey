var passport = require('passport');

module.exports = function() {

  var checkForFacebookUser = (req, res) => {
    res.send(req.isAuthenticated());
  }

  var findOrCreateFbUser = (User, FacebookUser, profile, done) => {
    User.findOrCreate({
      where: {
        email: profile.emails[0].value
      },
      defaults: {
        // password: '12345',
        email: profile.emails[0].value,
        // phone: '716-472-9022',
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        age: profile.name.age_range,
        gender: profile.gender,
        wantsEmails: 1,
        wantsTexts: 0,
        lastLoginDate: Date.now(),
        createdAt: Date.now()
      }
    }).spread((user, created) => {
      FacebookUser.findOrCreate({
        where: {
          facebookID: profile.id
        },
        defaults: {
          facebookID: profile.id,
          provider: 'facebook',
          userId: user.id
        }
      }).spread((user, created) => {
        return done(null, user);
      });
    })
  }
/*
{ provider: 'amazon',
  id: 'amzn1.account.AFDFKPYUZW2ZXQGVWRP7RLFL67VA',
  displayName: 'Connor Chevli',
  emails: [ { value: 'connorchev@gmail.com' } ],
*/


  var findOrCreateAmazonUser = (User, AmazonUser, profile, done) => {
    var fullName = profile.displayName.split(' ');
    User.findOrCreate({
      where: {
        email: profile.emails[0].value
      },
      defaults: {
        // password: '12345',
        email: profile.emails[0].value,
        // phone: '716-472-9022',
        firstName: fullName[0],
        lastName: fullName[fullName.length-1],
        // age: profile.name.age_range,
        // gender: profile.gender,
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
      AmazonUser.findOrCreate({
        where: {
          amazonID: profile.id
        },
        defaults: {
          amazonID: profile.id,
          provider: 'amazon',
          userId: user.id
        }
      }).spread((user, created) => {
        return done(null, user);
      });
    });
  }

  return {
    checkForFacebookUser: checkForFacebookUser,
    findOrCreateFbUser: findOrCreateFbUser,
    findOrCreateAmazonUser: findOrCreateAmazonUser
  }
}()