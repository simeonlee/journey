var passport = require('passport');
var { User, FacebookUser, AmazonUser } = require('../db/config.js');
var util = require('util');
var bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports = function() {

  var currentUserID = null;

  var checkForFacebookUser = (req, res) => {
    res.send(req.isAuthenticated());
  }

  var findOrCreateFbUser = (profile, done) => {
    email = profile.emails ? profile.emails[0].value : null;
    User.findOrCreate({
      where: {
        facebookID: profile.id
      },
      defaults: {
        // password: '12345',
        email: email,
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

  var findOrCreateAmazonUser = (profile, done) => {
    var fullName = profile.displayName.split(' ');
    User.findOrCreate({
      where: {
        amazonID: profile.id
      },
      defaults: {
        email: profile.emails[0].value,
        firstName: fullName[0],
        lastName: fullName[fullName.length-1],
        amazonID: profile.id,
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

  var signUpLocalUser = (req, res) => {
    //Hash Password and store info in DB
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      // Store hash and user info in DB.
      var fullName = req.body.fullName.split(' ');
      var firstName = fullName[0];
      var lastName = fullName[fullName.length-1];
      var username = req.body.username;
      var password = hash;
      var email = req.body.email;
      User.findOrCreate({
        where: {
          username: username
        },
        defaults: {
          username: username,
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
        }
      }).spread((user, created) => {
        if (created) {
          //login and send to journal page
          req.login(user, (err) => {
            return res.redirect('/journal');
          });
        } else {
          res.redirect('/');
        }
      });
    });
  }

  var loginUser = (username, password, done) => {
    User.findOne({where: { username: username }})
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password, user.password, function(err, res) {
          if (!res) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      });
  }


  var logoutAndRememberUser = (req, res) => {
    currentUserID = req.user.id;
    req.logout();
    res.send();
  }

  var createOrConnectAmazon = (profile, done) => {
    // decide whether to create a new amazon user (or use existing one),
    // or to link amazon profile to existing user.
    if (!currentUserID) {
      findOrCreateAmazonUser(profile, done);
    } else {
      connectAmazonToExisting(profile, done)
    }
  }

  var connectAmazonToExisting = (profile, done) => {
    User.findOne({where: { id: currentUserID }})
      .then((user) => {
        if (!user) {
          return done(null, false);
        } else {
          currentUserID = null;
          user.update({
            amazonID: profile.id
          }).then(() => {
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
          })
        }
      });
  }

  // decide whether to create a new Facebook user (or use existing one),
  // or to link Facebook profile to existing user.
  var createOrConnectFacebook = (profile, done) => {
    if (!currentUserID) {
      findOrCreateFbUser(profile, done);
    } else {
      connectFacebookToExisting(profile, done);
    }
  }

  var connectFacebookToExisting = (profile, done) => {
    User.findOne({where: { id: currentUserID }})
      .then((user) => {
        if (!user) {
          return done(null, false);
        } else {
          currentUserID = null;
          user.update({
            facebookID: profile.id
          }).then(() => {
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
      });
  }



  return {
    checkForFacebookUser: checkForFacebookUser,
    findOrCreateFbUser: findOrCreateFbUser,
    findOrCreateAmazonUser: findOrCreateAmazonUser,
    signUpLocalUser: signUpLocalUser,
    loginUser: loginUser,
    logoutAndRememberUser: logoutAndRememberUser,
    connectAmazonToExisting: connectAmazonToExisting,
    createOrConnectAmazon: createOrConnectAmazon,
    connectFacebookToExisting: connectFacebookToExisting,
    createOrConnectFacebook: createOrConnectFacebook,
  }
}()