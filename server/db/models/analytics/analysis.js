var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('analyses', {
    analysis: Sequelize.BLOB,
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  }, {tableName: 'analysis'});
};