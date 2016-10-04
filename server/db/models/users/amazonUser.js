var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var AmazonUser = sequelize.define('amazonUser', {
    amazonID: {
      type: Sequelize.STRING(500),
      unique: true
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  });
  return AmazonUser;
};