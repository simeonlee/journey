module.exports = function(sequelize, User) {
  var Gratitude = require('./../journals/journeys/gratitude')(sequelize);
  var Outlook = require('./../journals/journeys/outlook')(sequelize);
  var Affirmation = require('./../journals/journeys/affirmation')(sequelize);
  var Amazing = require('./../journals/journeys/amazing')(sequelize);
  var Reflection = require('./../journals/journeys/reflection')(sequelize);

  var getJournalEntries = (req, res) => {

    var data = {
      'date': req.query.date
    };

    // TODO: find better promise chain to avoid callback hell below
    Gratitude.find({
        where: {
          userId: req.user.dataValues.id,
          datetime: req.query.date
        }
      })
      .then(gratitudes => {
        gratitudes && (data.gratitudes = gratitudes.dataValues.entry);
        Outlook.find({
            where: {
              userId: req.user.dataValues.id,
              datetime: req.query.date
            }
          })
          .then(outlooks => {
            outlooks && (data.outlooks = outlooks.dataValues.entry);
            Affirmation.find({
                where: {
                  userId: req.user.dataValues.id,
                  datetime: req.query.date
                }
              })
              .then(affirmations => {
                affirmations && (data.affirmations = (affirmations ? affirmations.dataValues.entry : ''));
                Amazing.find({
                    where: {
                      userId: req.user.dataValues.id,
                      datetime: req.query.date
                    }
                  })
                  .then(amazings => {
                    amazings && (data.amazings = amazings.dataValues.entry);
                    Reflection.find({
                        where: {
                          userId: req.user.dataValues.id,
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

  var postJournalEntries = (req, res) => {
    Gratitude.findOrCreate({
        where: {
          datetime: req.body.date
        }, 
        defaults: {
          datetime: req.body.date,
          entry: req.body.gratitudes,
          interface: req.body.interface,
          userId: req.user.dataValues.id
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
          userId: req.user.dataValues.id
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
          userId: req.user.dataValues.id
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
          userId: req.user.dataValues.id
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
          userId: req.user.dataValues.id
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
  };

  return {
    getJournalEntries: getJournalEntries,
    postJournalEntries: postJournalEntries,
  }
}