var passport = require('passport');
var { User, FacebookUser, AmazonUser, Gratitude, Outlook, Affirmation, Amazing, Reflection } = require('../db/config.js');
var util = require('util');
var JournalEntry = require('./../db/models/journals/journalEntry');
var request = require('request');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var saltRounds = 10;

module.exports = (() => {

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
    bcrypt.hash(req.body.password, saltRounds, null,
      (err, hash) => {
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

  var linkAlexa = (req, res) => {
    User.findOne({where: { alexaID: req.body.userId }})
      .then((user) => {
        if (!user) {
          console.log(req.body.accessToken);
          request('https://api.amazon.com/user/profile?access_token=' + req.body.accessToken, (err, response, body) => {
            if (err) {
              console.log('Error: ', err)
            }
            // find amazonId in db and associate alexaId
            body = JSON.parse(body);
            console.log('in oauth body from linkalexa ', body);
            User.findOne({where: {amazonID: body.user_id}})
              .then((user) => {
                if(user) {
                  user.update({
                    alexaID: req.body.userId
                  })
                  res.status(201).send();
                } else {
                  res.status(200).send('not found');
                }
              });
          });
        } else {
          //if a user is already linked to alexa, then just send back a 200.
          console.log('NOT UPDATING USER W/ ALEXA ID')
          res.status(200).send();
        }
      });
  }

  var morningEntryMap = {
    1: Gratitude,
    2: Gratitude,
    3: Gratitude,
    4: Outlook,
    5: Outlook,
    6: Outlook,
    7: Affirmation
  }

  var eveningEntryMap = {
    1: Amazing,
    2: Amazing,
    3: Amazing,
    4: Reflection
  }

  var storeAlexaData = (req, res) => {
    User.findOne({where: { alexaID: req.body.userId }})
      .then((user) => {
    //     JournalEntry.findOrCreate({
    //       where: {
    //         datetime: moment().format('lll'),
    //         userId: user.id
    //       },
    //       defaults: {
    //         datetime: req.body.date,
    //         userId: user.id,
    //         morningCount: req.body.entryType === 'morning' ? 6 : 0,
    //         morning: req.body.entryType === 'morning' ? moment().startOf('day').format('lll'),
    //         eveningCount: req.body.entryType === 'evening' ? 7 : 0,
    //         evening: req.body.entryType === 'evening' ? moment().startOf('day').format('lll')
    //       }
    //     })
    //     .spread((journal, created) => {
    //       if (!created) { 
    //         if (req.body.entryType === 'morning') {
    //           journal.update({
    //             morningCount: 6,
    //             morning: moment().startOf('day').format('lll')
    //           })
    //           // .then(() => {
    //           //   if (req.body.morning > journal.dataValues.morning || journal.dataValues.morning === null) {
    //           //     journal.update({
          
    //           //     })
    //           //   }
    //           // })
    //           .catch(err => {
    //             console.log(err)
    //           })
    //         }
    //         if (req.body.entryType === 'evening') {
    //           journal.update({
    //             eveningCount: 7,
    //             evening: moment().startOf('day').format('lll')
    //           })
    //           // .then(() => {
    //           //   if (req.body.evening > journal[0].dataValues.evening || journal[0].dataValues.evening === null) {
    //           //     journal[0].update({
                    
    //           //     })
    //           //   }
    //           // })
    //           .catch(err => {
    //             console.log(err)
    //           })
    //         }
    //       }
    //     })


        var Entry = req.body.entryType === 'morning' ? morningEntryMap[req.body.prompt] : eveningEntryMap[req.body.prompt];
        Entry.create({
          entry: req.body.text,
          interface: 'alexa',
          userId: user.id,
          datetime: moment().startOf('day').toISOString()
        })
        res.status(201).send();
      }).catch((err) => {
        console.log('error in storeAlexaData: ', err);
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
    linkAlexa: linkAlexa,
    storeAlexaData: storeAlexaData
  }
})();