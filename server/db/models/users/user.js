var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING(20),
      unique: true
    },
    password: Sequelize.STRING(100),
    email: Sequelize.STRING(50),
    phone: Sequelize.STRING(20),
    firstName: Sequelize.STRING(30),
    lastName: Sequelize.STRING(30),
    age: Sequelize.INTEGER(3),
    gender: Sequelize.STRING(10),
    amazonID: Sequelize.STRING(500),
    alexaID: Sequelize.STRING(500),
    facebookID: Sequelize.STRING(20),
    wantsEmails: Sequelize.BOOLEAN,
    wantsTexts: Sequelize.BOOLEAN,
    lastLoginDate: Sequelize.DATE,
    createdAt: Sequelize.DATE
  });
  return User;
};