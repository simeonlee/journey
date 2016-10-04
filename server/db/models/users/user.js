var Sequelize = require('sequelize');

module.exports = function(sequelize) {
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
  return User;
};