var Sequelize = require('sequelize');

module.exports = function(sequelize, Affirmation, Amazing, Gratitude, Outlook, Reflection) {
  var User = sequelize.define('users', {
    username: Sequelize.STRING(20),
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

  var getEntriesOnDate = (req, res, next, userId, date) => {
    var results = []
    User.find({
      where: {
        userId: userId
      }
    })
    .then((user) => {
      user.getAffirmations({
        where: {
          datetime: date
        }
      })
      .then((affirmation) => {
        results.push(affirmation)
        user.getAmazings({
          where: {
            datetime: date
          }
        })
        .then((amazing) => {
          results.push(amazing)
          user.getGratitudes({
            where: {
              datetime: date
            }
          })
          .then((gratitude) => {
            results.push(gratitude)
            user.getOutlooks({
              where: {
                datetime: date
              }
            })
            .then((outlook) => {
              results.push(outlook)
              user.getReflections({
                where: {
                  datetime: date
                }
              })
              .then(reflection => {
                results.push(reflection)
                res.send(results);
              })
      })
    })
  }

  return User;
};