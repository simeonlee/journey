module.exports = (() => {
  var config = require('../config');
  var Gratitude = config.Gratitude;
  var Outlook = config.Outlook;
  var Affirmation = config.Affirmation;
  var Amazing = config.Amazing;
  var Reflection = config.Reflection;

  var getJournalEntriesForDate = (req, res) => {

    var userId = req.user.id /* Amazon */ || req.user.dataValues.id /* Facebook */;

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

    var userId = req.user.id /* Amazon */ || req.user.dataValues.id /* Facebook */;

    Gratitude.findOrCreate({
        where: {
          datetime: req.body.date
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
          datetime: req.body.date
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
          datetime: req.body.date
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
          datetime: req.body.date
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
          datetime: req.body.date
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
      res.send('Posted entries to database!');
  }  

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

  return {
    getJournalEntriesForDate: getJournalEntriesForDate,
    postJournalEntriesForDate: postJournalEntriesForDate,
    getUser: getUser,
    updateUserInfo: updateUserInfo
  }
})();