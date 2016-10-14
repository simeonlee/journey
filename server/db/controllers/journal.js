module.exports = (() => {
  var config = require('../config');
  var models = [
    config.Gratitude,
    config.Outlook,
    config.Affirmation,
    config.Amazing,
    config.Reflection
  ];
  var User = config.User;
  var Gratitude = config.Gratitude;
  var Outlook = config.Outlook;
  var Affirmation = config.Affirmation;
  var Amazing = config.Amazing;
  var Reflection = config.Reflection;
  var JournalEntry = config.JournalEntry;

  var getJournalEntriesForDate = (req, res) => {
    var userId = req.user.localId /* Amazon */ || req.user.dataValues.userId /* Facebook */;
    var data = {
      'date': req.query.date
    };

    // TODO: find better promise chain to avoid callback hell below
    Gratitude.find({
        where: {
          userId: userId,
          datetime: req.query.date
        }
      })
      .then(gratitudes => {
        gratitudes && (data.gratitudes = gratitudes.dataValues.entry);
        Outlook.find({
            where: {
              userId: userId,
              datetime: req.query.date
            }
          })
          .then(outlooks => {
            outlooks && (data.outlooks = outlooks.dataValues.entry);
            Affirmation.find({
                where: {
                  userId: userId,
                  datetime: req.query.date
                }
              })
              .then(affirmations => {
                affirmations && (data.affirmations = (affirmations ? affirmations.dataValues.entry : ''));
                Amazing.find({
                    where: {
                      userId: userId,
                      datetime: req.query.date
                    }
                  })
                  .then(amazings => {
                    amazings && (data.amazings = amazings.dataValues.entry);
                    Reflection.find({
                        where: {
                          userId: userId,
                          datetime: req.query.date
                        }
                      })
                      .then(reflections => {
                        reflections && (data.reflections = reflections.dataValues.entry);
                        res.send(data);
                      })
                  })
              })
          })
      })
  };

  var postJournalEntriesForDate = (req, res) => {
    var userId = req.user.localId /* Amazon */ || req.user.dataValues.userId /* Facebook */;

    JournalEntry.findOrCreate({
      where: {
        datetime: req.body.date,
        userId: userId
      },
      defaults: {
        datetime: req.body.date,
        userId: userId,
        morningCount: req.body.morningCount,
        morning: req.body.morning,
        eveningCount: req.body.eveningCount,
        evening: req.body.evening
      }
    })
    .spread((journal, created) => {
      if (!created) { 
        if (req.body.morningCount > journal.dataValues.morningCount) {
          journal.update({
            morningCount: req.body.morningCount,
            morning: req.body.morning
          })
          // .then(() => {
          //   if (req.body.morning > journal.dataValues.morning || journal.dataValues.morning === null) {
          //     journal.update({
      
          //     })
          //   }
          // })
          .catch(err => {
            console.log(err)
          })
        }
        if (req.body.eveningCount > journal.dataValues.eveningCount) {
          journal.update({
            eveningCount: req.body.eveningCount,
            evening: req.body.evening
          })
          // .then(() => {
          //   if (req.body.evening > journal[0].dataValues.evening || journal[0].dataValues.evening === null) {
          //     journal[0].update({
                
          //     })
          //   }
          // })
          .catch(err => {
            console.log(err)
          })
        }
      }
    })

    Gratitude.findOrCreate({
        where: {
          datetime: req.body.date,
          userId: userId
        }, 
        defaults: {
          datetime: req.body.date,
          entry: req.body.gratitudes,
          interface: req.body.interface,
          userId: userId
        }
      })
      .spread((instance, created) => {
        if (!created) {
          instance.update({
              entry: req.body.gratitudes,
              interface: req.body.interface,
            })
            .then(() => {
              // console.log('Updated gratitudes in database!');
            })
            .catch(error => {
              // console.log(error);
            })
        } else {
          // console.log('Created and saved gratitudes to database!');
        }
      })
    Outlook.findOrCreate({
        where: {
          datetime: req.body.date,
          userId: userId
        }, 
        defaults: {
          datetime: req.body.date,
          entry: req.body.outlooks,
          interface: req.body.interface,
          userId: userId
        }
      })
      .spread((instance, created) => {
        if (!created) {
          instance.update({
              entry: req.body.outlooks,
              interface: req.body.interface,
            })
            .then(() => {
              // console.log('Updated outlooks in database!');
            })
            .catch(error => {
              // console.log(error);
            })
        } else {
          // console.log('Created and saved outlooks to database!');
        }
      })
    Affirmation.findOrCreate({
        where: {
          datetime: req.body.date,
          userId: userId
        }, 
        defaults: {
          datetime: req.body.date,
          entry: req.body.affirmations,
          interface: req.body.interface,
          userId: userId
        }
      })
      .spread((instance, created) => {
        if (!created) {
          instance.update({
              entry: req.body.affirmations,
              interface: req.body.interface,
            })
            .then(() => {
              // console.log('Updated affirmations in database!');
            })
            .catch(error => {
              // console.log(error);
            })
        } else {
          // console.log('Created and saved affirmations to database!');
        }
      })
    Amazing.findOrCreate({
        where: {
          datetime: req.body.date,
          userId: userId
        }, 
        defaults: {
          datetime: req.body.date,
          entry: req.body.amazings,
          interface: req.body.interface,
          userId: userId
        }
      })
      .spread((instance, created) => {
        if (!created) {
          instance.update({
              entry: req.body.amazings,
              interface: req.body.interface,
            })
            .then(() => {
              // console.log('Updated amazings in database!');
            })
            .catch(error => {
              // console.log(error);
            })
        } else {
          // console.log('Created and saved amazings to database!');
        }
      })
    Reflection.findOrCreate({
        where: {
          datetime: req.body.date,
          userId: userId
        }, 
        defaults: {
          datetime: req.body.date,
          entry: req.body.reflections,
          interface: req.body.interface,
          userId: userId
        }
      })
      .spread((instance, created) => {
        if (!created) {
          instance.update({
              entry: req.body.reflections,
              interface: req.body.interface,
            })
            .then(() => {
              // console.log('Updated reflections in database!');
            })
            .catch(error => {
              // console.log(error);
            })
        } else {
          // console.log('Created and saved reflections to database!');
        }
      })
    
    // Update the days to be analyzed for this day's entries
    User.find({
        where: {
          id: userId
        }
      })
      .then(user => {
        var daysToBeAnalyzed = user.dataValues.daysToBeAnalyzed || null;
        if (!daysToBeAnalyzed) {
          var days = {}
        } else {
          var days = JSON.parse(daysToBeAnalyzed.toString()); // converted from buffer format to object
        }

        days[req.body.date] = true; // update the date in days object to true to signify that a date needs to be updated here
        var buffer = Buffer.from(JSON.stringify(days));
        User.update({
          daysToBeAnalyzed: buffer,
        }, {
          where: {
            id: userId
          }
        });
      })

    res.send('Posted entries to database!');
  };

  var getUser = (req, res, next, userId) => {
    User.find({
      where: {
        id: userId
      }
    })
    .then(user => {
      res.send(user)
    })
  }

  var updateUserInfo = (req, res, next) => {
    User.find({
      id: req.body.userId
    })
    .then(user => {
      user.updateAttributes(JSON.parse(req.body.updated))
      .then(user => res.send(user))
    })
  }

  var getEntryInfo = (req, res, next) => {
    var userId = req.user.localId /* Amazon */ || req.user.dataValues.userId /* Facebook */;
    JournalEntry.findAll({
      order: [['datetime', 'DESC']],
      where: {
        userId: userId
      },
      limit: parseInt(req.query.limit)
    })
    .then(entries => {
      res.send(entries)
    })
  }

  return {
    getJournalEntriesForDate: getJournalEntriesForDate,
    postJournalEntriesForDate: postJournalEntriesForDate,
    getUser: getUser,
    updateUserInfo: updateUserInfo,
    getEntryInfo: getEntryInfo,
  }
})();