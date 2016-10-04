var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Interaction = sequelize.define('interactions', {
    type: Sequelize.STRING(15), // Alexa, web or mobile
    datetime: Sequelize.DATE,
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  });

  return Interaction;
};