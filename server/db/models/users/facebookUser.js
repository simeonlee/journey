var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var FacebookUser = sequelize.define('facebookUser', {
    facebookID: {
      type: Sequelize.STRING(20),
      unique: true
    },
    provider: Sequelize.STRING(20),
    age_range: Sequelize.INTEGER(3),
    link: Sequelize.STRING(80),
    picture: Sequelize.STRING(200),
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  });
  return FacebookUser;
};