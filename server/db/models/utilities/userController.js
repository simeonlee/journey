var query = (year, month, day) => {
  return {
    where: {
      createdAt: {
        between: [year + '-' + month + '-' + day + ' 00:00:00', year + '-' + month + '-' + day + ' 23:59:59']
      }
    }
  }
}

module.exports = function(sequelize, User) {
  var Gratitude = require('./../journals/journeys/gratitude')(sequelize);
  var Outlook = require('./../journals/journeys/outlook')(sequelize);
  var Affirmation = require('./../journals/journeys/affirmation')(sequelize);
  var Amazing = require('./../journals/journeys/amazing')(sequelize);
  var Reflection = require('./../journals/journeys/reflection')(sequelize);

  var getEntriesOnDate = (req, res, next, userId, month, day, year) => {
    var localQuery = query(year, month, day);
    var results = []
    User.find({
      where: {
        id: userId
      }
    })
    .then(user => {
      user.getAffirmations(localQuery)
      .then((affirmation) => {
        results.push(affirmation)
        console.log('made it yo')
        user.getAmazings(localQuery)
        .then((amazing) => {
          results.push(amazing)
          user.getGratitudes(localQuery)
          .then((gratitude) => {
            results.push(gratitude)
            user.getOutlooks(localQuery)
            .then((outlook) => {
              results.push(outlook)
              user.getReflections(localQuery)
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
      if (req.body.affirmation) {
        Affirmation.create({
          entry: req.body.affirmation,
          interface: req.body.interface
        })
        .then(affirmation => {
          user.setAffirmations(affirmation)
        })
      }
      if (req.body.amazing) {
        Amazing.create({
          entry: req.body.amazing,
          interface: req.body.interface
        })
        .then(amazing => {
          user.setAmazings(amazing)
        })
      }
      if (req.body.gratitude) {
        Gratitude.create({
          entry: req.body.gratitude,
          interface: req.body.interface
        })
        .then(gratitude => {
          user.setGratitudes(gratitude)
        })
      }
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

  // var editEntry = (req, res, next, id, year, month, day) => {
  //   User.find({
  //     where: {
  //       id: req.body.id
  //     }
  //   })
  //   .then(user => {
  //     if (req.body.affirmation) {
        
  //     }
  //     if (req.body.amazing)
  //     if (req.body.gratitude)
  //     if (req.body.outlook)
  //     if (req.body.reflection)
  //   })
  // }



  return {
    getEntriesOnDate: getEntriesOnDate,
    postEntry: postEntry,
    //editEntry: editEntry
  }
}