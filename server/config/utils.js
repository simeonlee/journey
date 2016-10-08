var passport = require('passport');
var { User, FacebookUser, AmazonUser } = require('../db/config.js');
var util = require('util');

module.exports = function() {

  var checkForFacebookUser = (req, res) => {
    res.send(req.isAuthenticated());
  }

  var findOrCreateFbUser = (profile, done) => {
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


  var findOrCreateAmazonUser = (profile, done) => {
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

  var signUpLocalUser = (req, res) => {
    console.log('REQUEST =========>');
    console.log(req.body);
    // User.findOne({where: })
    var fullName = req.body.fullName.split(' ');
    var firstName = fullName[0];
    var lastName = fullName[fullName.length-1];
    var username = req.body.username;
    var password = req.body.password;
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
        // SEND BACK RESPONSE THAT THE USERNAME HAS BEEN TAKEN
        req.send();
      }
    });
  }

  var loginUser = (username, password, done) => {
    console.log('yooooooo', username, password);
    User.findOne({where: { username: username }})
      .then((user) => {
        if (!user) {
          console.log('no user');
          // return done(null, false, { message: 'Incorrect username.' });
          return done(null, false);

        }
        if (!user.validPassword(password)) {
          console.log('invalid password');
          // return done(null, false, { message: 'Incorrect password.' });
          return done(null, false);
        }
        console.log('user found!')
        return done(null, user);
      });
  }

  return {
    checkForFacebookUser: checkForFacebookUser,
    findOrCreateFbUser: findOrCreateFbUser,
    findOrCreateAmazonUser: findOrCreateAmazonUser,
    signUpLocalUser: signUpLocalUser,
    loginUser: loginUser,
  }
}()