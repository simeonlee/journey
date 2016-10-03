var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Gratitude = require('./../journals/journeys/gratitude')(sequelize);
  var Outlook = require('./../journals/journeys/outlook')(sequelize);
  var Affirmation = require('./../journals/journeys/affirmation')(sequelize);
  var Amazing = require('./../journals/journeys/amazing')(sequelize);
  var Reflection = require('./../journals/journeys/reflection')(sequelize);

  var User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING(20),
      unique: true
    },
    password: Sequelize.STRING(30),
    email: Sequelize.STRING(50),
    phone: Sequelize.STRING(20),
    firstName: Sequelize.STRING(30),
    lastName: Sequelize.STRING(30),
    age: Sequelize.INTEGER(3),
    gender: Sequelize.STRING(10),
    bio: Sequelize.STRING(10),
    website: Sequelize.STRING(100),
    job: Sequelize.STRING(50),
    industry: Sequelize.STRING(50),
    employer: Sequelize.STRING(50),
    wantsEmails: Sequelize.BOOLEAN,
    wantsTexts: Sequelize.BOOLEAN,
    lastLoginDate: Sequelize.DATE,
    createdAt: Sequelize.DATE
  });

  var getEntriesOnDate = (req, res, next, userId, month, day, year) => {
    var results = []
    console.log(year + '-' + month + '-' + day + ' 00:00:00.00', year + '-' + month + '-' + day + ' 23:59:59.999')
    var query = {
      where: {
        createdAt: {
          between: [year + '-' + month + '-' + day + ' 00:00:00', year + '-' + month + '-' + day + ' 23:59:59']
        }
      }
    }
    User.find({
      where: {
        id: userId
      }
    })
    .then(user => {
      user.getAffirmations(query)
      .then((affirmation) => {
        results.push(affirmation)
        user.getAmazings(query)
        .then((amazing) => {
          results.push(amazing)
          user.getGratitudes(query)
          .then((gratitude) => {
            results.push(gratitude)
            user.getOutlooks(query)
            .then((outlook) => {
              results.push(outlook)
              user.getReflections(query)
              .then(reflection => {
                results.push(reflection)
                res.send(results);
              })
            })
          })
        })
      })
    })
  }

  var postEntry = (req, res, next) => {
    console.log(req.body)
    User.find({
      where: {
        id: req.body.id
      }
    })
    .then(user => {
      Affirmation.create({
        entry: req.body.affirmation,
        interface: req.body.interface
      })
      .then(affirmation => {
        user.setAffirmations(affirmation)
      })
      Amazing.create({
        entry: req.body.amazing,
        interface: req.body.interface
      })
      .then(amazing => {
        user.setAmazings(amazing)
      })
      Gratitude.create({
        entry: req.body.gratitude,
        interface: req.body.interface
      })
      .then(gratitude => {
        user.setGratitudes(gratitude)
      })
      Outlook.create({
        entry: req.body.outlook,
        interface: req.body.interface
      })
      .then(outlook => {
        user.setOutlooks(outlook)
      })
      Reflection.create({
        entry: req.body.reflection,
        interface: req.body.interface
      })
      .then(reflection => {
        user.setReflections(reflection)
      })
      res.send(user);
    })
    
  }

  return {
    User: User,
    getEntriesOnDate: getEntriesOnDate,
    postEntry: postEntry
  };
};