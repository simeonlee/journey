var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Affirmation = sequelize.define('affirmations', {
    entry: Sequelize.STRING(500),
    interface: Sequelize.STRING(10),
    datetime: {
      type: Sequelize.DATE,
      default: Date.now()
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  });

  return Affirmation;
};